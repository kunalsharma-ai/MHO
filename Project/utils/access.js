// Access rules for member data (added with the member-API lock-down, Nov 2026).
//   requireMember  - a signed-in member (JWT in the Authorization header or the httpOnly cookie, same as /api/v1/me)
//   requireAdmin   - a signed-in member whose role, read fresh from the database, is an admin role
//   selfOrAdmin    - the member named in :id, or an admin
//   optionalMember - attaches req.user when a valid token is present, never blocks (public endpoints that behave
//                    differently for signed-in members)
import isAuthenticated from "./isAuthenticated.js";
import { verify } from "./token.js";
import { User as userModel } from "../app/model/index.js";

export const ADMIN_ROLES = ["administrator", "admin", "superadmin", "root"];

async function roleOf(id) {
    const u = await userModel.findById(id).select("+role").lean();
    return u?.role || "";
}
// a signed-in member; req.isAdmin tells the route whether the member is also an admin
export function requireMember(req, res, next) {
    return isAuthenticated(req, res, async () => {
        try {
            req.isAdmin = ADMIN_ROLES.includes(String(await roleOf(req.user?._id)).toLowerCase());
        } catch (e) { req.isAdmin = false; }
        return next();
    });
}

const deny = (res, status, message) => res.status(status).json({ status: "error", message });

export function requireAdmin(req, res, next) {
    return isAuthenticated(req, res, async () => {
        try {
            const role = await roleOf(req.user?._id);
            if (!ADMIN_ROLES.includes(String(role).toLowerCase())) return deny(res, 403, "Forbidden");
            req.user.role = role;
            req.isAdmin = true;
            return next();
        } catch (e) {
            return deny(res, 403, "Forbidden");
        }
    });
}

export function selfOrAdmin(param = "id") {
    return (req, res, next) => isAuthenticated(req, res, async () => {
        try {
            if (String(req.user?._id) === String(req.params[param])) { req.isSelf = true; return next(); }
            const role = await roleOf(req.user?._id);
            if (!ADMIN_ROLES.includes(String(role).toLowerCase())) return deny(res, 403, "Forbidden");
            req.isAdmin = true;
            return next();
        } catch (e) {
            return deny(res, 403, "Forbidden");
        }
    });
}

export async function optionalMember(req, res, next) {
    try {
        const raw = req.headers.authorization ?? req.cookies?.authorization;
        const token = raw && String(raw).split(" ")[1];
        if (token) {
            const u = verify(token);
            if (u && u._id && u.origin === req.origin) {
                req.user = (await userModel.findById(u._id).lean()) || undefined;
                if (req.user) {
                    req.user._id = String(req.user._id);
                    const role = await roleOf(u._id);
                    req.isAdmin = ADMIN_ROLES.includes(String(role).toLowerCase());
                }
            }
        }
    } catch (e) { /* not signed in: carry on as a visitor */ }
    return next();
}

// Fields a member may change on their own record (PUT /api/v1/user/:id by the member themselves).
// Everything else - role, category, status, verification flags, quality score, password, email, date of birth,
// Teen/guardian data - can only be changed by an admin or by its own dedicated flow.
export const SELF_EDITABLE = ["terms", "notification", "consent", "socials", "profilePicture", "timezone", "paymentMethod"];
// Fields an admin may never set through the generic update (they have their own flows).
export const ADMIN_BLOCKED = ["password", "_id", "origin", "createdAt", "updatedAt", "marketingOptIn", "marketingOptInHistory"];

export function pick(obj = {}, keys = []) {
    const out = {};
    for (const k of keys) if (Object.prototype.hasOwnProperty.call(obj, k)) out[k] = obj[k];
    return out;
}
export function omit(obj = {}, keys = []) {
    const out = { ...obj };
    for (const k of keys) delete out[k];
    // no Mongo operators or dotted paths from the browser
    for (const k of Object.keys(out)) if (k.startsWith("$") || k.includes(".")) delete out[k];
    return out;
}
// A Mongo filter coming from the browser: drops operators that run code or reach other collections.
export function safeFilter(f = {}) {
    const bad = new Set(["$where", "$function", "$accumulator", "$expr", "$lookup"]);
    const walk = (v) => {
        if (Array.isArray(v)) return v.map(walk);
        if (v && typeof v === "object") {
            const o = {};
            for (const [k, x] of Object.entries(v)) if (!bad.has(k)) o[k] = walk(x);
            return o;
        }
        return v;
    };
    return walk(f);
}

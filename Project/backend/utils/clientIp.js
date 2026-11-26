// The visitor's real address, for rate limits, captcha binding and audit trails.
//
// X-Forwarded-For and X-Real-IP are plain request headers: anyone can send them. They are only believed when the
// request came from a proxy we trust, and X-Forwarded-For is read from the right (the end our own proxies write),
// skipping trusted proxies, so addresses a caller puts at the front are ignored.
//
// MHO_TRUSTED_PROXIES (comma separated) lists the proxies in front of the API. Each entry is an address, a CIDR
// range, or one of: loopback, linklocal, uniquelocal (10/8, 172.16/12, 192.168/16, fc00::/7, i.e. the docker
// networks the gateway runs on). Default: "loopback,uniquelocal", which trusts only the local gateway.
// If a CDN or load balancer sits in front of the gateway, add its ranges, e.g.
//   MHO_TRUSTED_PROXIES=loopback,uniquelocal,173.245.48.0/20,103.21.244.0/22
// Set it to "none" to ignore the headers entirely and use the socket address.
import net from "net";

const PRESETS = {
    loopback: ["127.0.0.0/8", "::1/128"],
    linklocal: ["169.254.0.0/16", "fe80::/10"],
    uniquelocal: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "fc00::/7"],
};

/** "::ffff:1.2.3.4" -> "1.2.3.4"; strips a port from "1.2.3.4:5678" and brackets from "[::1]:80". */
export function normalizeIp(value) {
    let ip = String(value || "").trim();
    if (!ip) return "";
    const bracket = ip.match(/^\[([^\]]+)\](?::\d+)?$/);
    if (bracket) ip = bracket[1];
    else if (/^\d{1,3}(\.\d{1,3}){3}:\d+$/.test(ip)) ip = ip.split(":")[0];
    const mapped = ip.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/i);
    if (mapped) ip = mapped[1];
    return net.isIP(ip) ? ip : "";
}

/** Builds a matcher for a MHO_TRUSTED_PROXIES-style list. Unknown entries are reported once and skipped. */
export function compileTrust(spec) {
    const list = new net.BlockList();
    const raw = String(spec ?? "").trim() || "loopback,uniquelocal";
    if (raw.toLowerCase() === "none") return () => false;
    for (const entry of raw.split(",").map((s) => s.trim()).filter(Boolean)) {
        for (const item of PRESETS[entry.toLowerCase()] || [entry]) {
            const [addr, bits] = item.split("/");
            const ip = normalizeIp(addr);
            const type = net.isIP(ip) === 6 ? "ipv6" : "ipv4";
            if (!ip) { console.warn(`MHO_TRUSTED_PROXIES: ignoring "${item}"`); continue; }
            if (bits === undefined) list.addAddress(ip, type);
            else list.addSubnet(ip, Number(bits), type);
        }
    }
    return (ip) => {
        const n = normalizeIp(ip);
        if (!n) return false;
        return list.check(n, net.isIP(n) === 6 ? "ipv6" : "ipv4");
    };
}

let trusted = compileTrust(process.env.MHO_TRUSTED_PROXIES);
/** Tests: re-read the setting. */
export const setTrustedProxies = (spec) => { trusted = compileTrust(spec); };

const header = (req, name) => {
    const v = req.headers?.[name];
    return Array.isArray(v) ? v.join(",") : String(v || "");
};

export function clientIp(req) {
    const peer = normalizeIp(req.socket?.remoteAddress || req.connection?.remoteAddress) || "";
    if (!trusted(peer)) return peer;
    // Walk X-Forwarded-For from the right: the last entry was written by the proxy that talked to us.
    const hops = header(req, "x-forwarded-for").split(",").map((s) => s.trim()).filter(Boolean);
    let last = "";
    for (let i = hops.length - 1; i >= 0; i--) {
        const ip = normalizeIp(hops[i]);
        if (!ip) return last || peer; // garbage in the chain: stop at the last address we could vouch for
        if (!trusted(ip)) return ip;
        last = ip;
    }
    // No (untrusted) forwarded address: a trusted proxy may still report the visitor in X-Real-IP.
    return normalizeIp(header(req, "x-real-ip")) || last || peer;
}

/** Express middleware: sets req.clientIP (used by logs and audit fields) from the trusted chain. */
export function realIp(req, res, next) {
    req.clientIP = clientIp(req);
    next();
}

export default clientIp;

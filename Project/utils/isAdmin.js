import { isAuthenticated, adminLogger } from "./index.js";
async function isAdmin(req, res, next) {
    isAuthenticated(req, res, () => {
        if (![
            "admin",
            "superadmin",
            "root"
        ].includes(req.user.role)) {
            adminLogger.Log(`Error: User trying administrative action`, req.user)
            throw new HttpError("Forbidden", 403)
        }
        next();
    })
}

export default isAdmin;
// An admin, with the role read fresh from the database (utils/access.js). The old check here threw an undefined
// HttpError inside a callback, so a refused request hung instead of answering 403, and it read the role from a record
// that never selects it.
export { requireAdmin as default } from "./access.js";

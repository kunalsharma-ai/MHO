import { HttpError, asyncHandler, API } from "express-web-tools"
import express from "express";
import { expressRoute, expressView, isAuthenticated, fsLogger, Mutate, Token } from "../../utils/index.js"
import JWT from "jsonwebtoken";
import {
  User as userController
} from "../../controller/index.js";

async function getSocialChannels() {

  return resp;
}
const router = express.Router();
router
  .route(["/socials", "/social"])
  // The sign-on service sends the browser here (GET ?token=...). This used to go through expressRoute, which only
  // answers JSON: the "redirect" was ignored, so the person saw a raw JSON page instead of being sent on. For an
  // unverified e-mail that page held their whole account record (issue #47), and a good sign-in never reached the
  // dashboard because the login token was only printed, never stored. Now every outcome is a real redirect:
  //   no account / bad token  -> /?signup=1&...            (frontend-1 forwards to /join)
  //   e-mail not verified      -> /?verifyemail=<mail>      (frontend-1 shows "confirm your email" with a resend button)
  //   signed in                -> /#social-token=<jwt>      (frontend-1 stores it, then goes to consent or dashboard)
  // The token travels in the #fragment, which browsers never send to a server or put in a Referer header.
  .get(
    asyncHandler(async (req, res) => {
      const go = (to) => res.redirect(302, to);
      let { token } = req.query;
      if (!token) return go("/?signup=1");
      // The sign-on service's key comes from the environment. It used to be written here in the code, so anyone who
      // saw the code could make a token for any e-mail and be signed in as that member. Without the key social
      // sign-on is off. Tokens must be HS256 and at most 15 minutes old.
      const key = process.env.SOCIAL_JWT_SECRET;
      if (!key || key.length < 32) return go("/?signup=1");
      let info;
      try {
        info = JWT.verify(String(token), key, { algorithms: ["HS256"], maxAge: "15m" });
      } catch (e) {
        return go("/?signup=1");
      }
      const signup = () => {
        const q = new URLSearchParams();
        q.set("signup", "1");
        for (const k of ["name", "given_name", "family_name", "first_name", "last_name", "email"]) {
          if (typeof info[k] === "string" && info[k]) q.set(k, info[k]);
        }
        return go(`/?${q.toString()}`);
      };
      if (typeof info.email !== "string" || !info.email) return signup();
      const user = await userController.findOne({ mail: info.email.trim().toLowerCase() });
      if (!user) return signup();
      if (user?.isVerified?.email !== "verified") return go(`/?verifyemail=${encodeURIComponent(user.mail)}`);
      if (user.accountStatus === "suspended" || user.isActive === false || user.isDeleted === true) return go("/login/?inactive=1");
      const jwt = Token.generate({
        _id: user._id,
        category: user.category,
        email: user.mail,
        phone: user.phone,
        name: user.name,
        origin: user.origin,
        role: user.role ?? ""
      });
      return go(`/#social-token=${encodeURIComponent(jwt)}`);
    })
  )
  .post(
    asyncHandler(
      async (req, res) => {
        let socialUrl = process.env.socials;
        if (!socialUrl) throw new HttpError(404, "Social signon is not allowed")
        let temp = new URL(socialUrl);
        let api = new API(
          {
            baseURL: `${temp.origin}`,
            useHttps: (temp.protocol === "https:")
          }
        )

        let resp = await api.get(temp.pathname.replace(/^\//, ""));
        console.log(resp);
        return res.json({
          status: "success",
          data: resp?.data?.data?.providers
        });
      }
    )
  )
export default router;

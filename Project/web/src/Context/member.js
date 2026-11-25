"use client";
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/util";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
const MemberContext = createContext();
function notLoggedIn(pathname, router) {
  if (typeof pathname !== "string") return;
  return;

  if (pathname.startsWith("/member")) router.replace("/");
  if (pathname.startsWith("/admin")) router.replace("/");
}

async function loadUserInfo() {
  try {
    let temp = await api.get(`/api/v1/me`);
    if (temp.status === "error") throw new Error(temp.message);
    if ("data" in temp)
      return {
        ...temp.data,
        fullname: temp.data.fullName,
        firstname: temp?.data?.name?.first,
        lastname: temp?.data?.name?.last,
      };
  } catch (error) {
    throw new Error(error.message);
  }
}
class ValidUser {
  constructor(userinfo, router) {
    this.userinfo = userinfo;
    this.router = router;
  }
  termsAccepted() {
    return (
      "terms" in this.userinfo &&
      this.userinfo.terms instanceof Array &&
      this.userinfo.terms.length !== 0
    );
  }
  emailVerified() {
    return (
      "isVerified" in this.userinfo &&
      "email" in this.userinfo.isVerified &&
      this.userinfo.isVerified.email === "verified"
    );
  }
  // Where the API says this member goes next: verify-email | consent | dashboard | admin | support.
  // Returns null when the API has no journey endpoint (older backend image), so the legacy checks still apply.
  async journey() {
    try {
      const temp = await api.get(`/api/v1/me/journey`);
      if (temp?.status === "success" && temp.data && temp.data.next) return temp.data;
    } catch (error) {
      /* older API */
    }
    return null;
  }
  isAdmin() {
    return (
      "role" in this.userinfo &&
      ["root", "admin", "administrator"].includes(this.userinfo.role)
    );
  }
  async allowAccess(pathname) {
    if (pathname.startsWith("/admin")) {
      if (!this.isAdmin()) {
        this.router.replace("/");
        return false;
      }
    }
    if (pathname.startsWith("/member")) {
      // The welcome survey is no longer a gate: members reach the dashboard once their email is verified and
      // they have signed the current consent version for their panel (HCP, caregiver or patient).
      const j = await this.journey();
      if (j) {
        if (j.next === "verify-email") {
          this.router.replace("/login?verify=1"); // no email address in the URL
          return false;
        }
        if (j.next === "guardian") {
          // a teen member waits on this page until their parent or guardian approves the account
          if (pathname.startsWith("/member/guardian")) return true;
          this.router.replace("/member/guardian");
          return false;
        }
        if (j.next === "consent") {
          window.location.replace(j.nextUrl); // static consent page served by the marketing site
          return false;
        }
        return true;
      }
      if (!this.emailVerified()) {
        this.router.replace("/login?verify=1");
        return false;
      }
      if (!this.termsAccepted()) {
        this.router.replace("/auth/terms");
        return false;
      }
    }
    return true;
  }
}
export function MemberProvider({ children }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [reload, setReload] = useState(1);
  const [me, setMe] = useState(null);
  const [ready, setReady] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useLayoutEffect(() => setHydrated(true), []);
  const [categories, setCategories] = useState([]);
  const [router, pathname] = [useRouter(), usePathname()];
  function Reload() {
    setReload(reload + 1);
  }
  function update(data) {
    if (!Boolean(data)) updateMe(null);
    else updateMe(data);
  }
  async function Logout() {
    let resp = await api.delete("/api/v1/me");
    if (typeof window === "undefined") return;
    localStorage.clear();
    Reload();
    router.replace("/");
  }

  function updateMe(data) {
    setMe({
      ...data,
      Reload,
      Logout,
      update,
    });
  }

  useEffect(() => {
    api
      .get(`/api/v1/category/`)
      .then((resp) => {
        if (resp.status === "success") {
          setCategories(resp.data || []);
        }
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    loadUserInfo()
      .then(async (resp) => {
        let user = new ValidUser(resp, router);
        const stay = await user.allowAccess(pathname);
        updateMe(resp);
        if (stay) setReady(true);
      })
      .catch((err) => {
        setMe(null);
        setReady(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reload, pathname]);

  useEffect(() => {
    if (isLoading || !Boolean(me)) return () => {};
    api.get(`/api/v1/me/profile`).then((resp) => {
      update({
        ...me,
        ...resp.data,
      });
    });
  }, [isLoading]);

  const qualityScoreTotal =
    categories.find(
      (item) =>
        item?.name?.trim().toLowerCase() === me?.category?.trim().toLowerCase(),
    )?.qualityScoreScale ?? 0;

  const member = me
    ? {
        ...me,
        qualityScoreTotal,
      }
    : null;

  const waiting =
    hydrated &&
    !ready &&
    typeof pathname === "string" &&
    pathname.startsWith("/member");
  return (
    <MemberContext.Provider value={member}>
      {waiting ? <LoadingOverlay /> : children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  return useContext(MemberContext);
}

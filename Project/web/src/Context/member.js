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
  async hasCompletedWelcomeSurvey() {
    try {
      let temp = await api.post(`/api/v1/response`, {
        ["survey.slug"]: "welcome",
        status: "complete",
      });
      if (temp.status === "error") {
        return false;
      }
      return (
        "data" in temp && Array.isArray(temp.data) && temp.data.length === 1
      );
    } catch (error) {
      console.error(error);
      return false;
    }
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
      if (!this.emailVerified()) {
        this.router.replace(`/?verifyemail=${this.userinfo.mail}`);
        return false;
      }
      if (!this.termsAccepted()) {
        this.router.replace("/auth/terms");
        return false;
      }
      if (!(await this.hasCompletedWelcomeSurvey())) {
        this.router.replace("/survey?name=welcome");
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

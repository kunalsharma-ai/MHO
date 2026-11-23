"use client";
// Settings now live in My Account (password, notifications, terms, display): this page opens it on the Password tab.
import Account from "../../mx/pages/Account";
export default function Page() { return <Account initialTab="password" />; }

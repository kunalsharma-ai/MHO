"use client"
import React from "react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import { useMember } from "@/Context";
import ChatWidget from "@/componentsMHO/ChatWidget";


function layout({ children }) {
  const member=useMember();
  
  return (
    <div>
      <AdminHeader />
      <AdminSidebar>
        <main>{ children }</main>
      </AdminSidebar>
      <ChatWidget/>
    </div>
  );
}

export default layout;

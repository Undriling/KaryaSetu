"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import StoreProvider, { useAppSelector } from "./redux";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state: any) => state.global?.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state: any) => state.global?.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar/>
      <main
        className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 md:pl-64 ${
          isSidebarCollapsed ? "" : "md:pl-64"}`}
      >
        {/* Navbar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;

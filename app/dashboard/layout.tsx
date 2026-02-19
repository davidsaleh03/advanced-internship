import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import React, { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="app">
      <Sidebar />
      <div className="main">
        <TopBar />
        {children}
      </div>
    </div>
    </>
  );
}

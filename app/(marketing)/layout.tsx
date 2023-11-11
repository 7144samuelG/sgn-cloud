import React from "react";
import NavBar from "./_components/navbar";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <NavBar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
}

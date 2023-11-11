"use client";
//import NavBar from "@/app/(marketing)/_components/navbar";
import { useSession } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NavBar } from "./dashboard/_components/navbar";
import Navigation from "./dashboard/_components/navigation";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useSession();
  // if (!isSignedIn) {
  //   return redirect("/");
  // }
  return (
    <>
      <div className="h-[100vh] flex dark:bg-[#1F1F1F] border">
        <Navigation />
        <main className="flex-1 h-full overflow-y-auto">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;

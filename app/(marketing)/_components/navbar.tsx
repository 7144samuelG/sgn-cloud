"use client"
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { SignInButton, UserButton,useUser,useSession } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";
const NavBar = () => {
  const scrolled = useScrollTop();
  const {isSignedIn}=useSession();
  const {isLoaded } = useUser();
  const router=useRouter()
  return (
    <>
      <div
        className={cn(
          "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
          scrolled && "border-b shadow-sm"
        )}
      >
        <Logo />
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!isLoaded && (
          <Spinner />
        )}
        {!isSignedIn && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get SgnCloud free</Button>
            </SignInButton>
          </>
        )}
         {isSignedIn && (
        <>
          <Button variant="ghost" size="sm" className="cursor-pointer" asChild  onClick={()=>router.push("/dashboard")}>
            <h1>Enter Sgncloud</h1>
            
          </Button>
          <UserButton/>
        </>
      )}

          <ModeToggle /> 
        </div>
      </div>
    </>
  );
};

export default NavBar;

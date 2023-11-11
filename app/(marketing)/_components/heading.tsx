"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  UserButton,
  useSession,
  useUser,
} from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isSignedIn } = useSession();
   const {isLoaded } = useUser();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
       {!isLoaded && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isSignedIn && (
        <>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </SignInButton>
        </>
      )}
      {isSignedIn && (
        <>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">Enter Jotion</Link>
          </Button>
        </>
      )}
      <div className="flex items-center justify-center space-x-2">
        <h3 className="text-base sm:text-xl md:text-2xl font-medium">
          for more storage checkout our
        </h3>
        <Link
          href="/pricing"
          className="text-base sm:text-xl md:text-2xl underline font-medium text-blue-600"
        >
          pricing
        </Link>
      </div>
    </div>
  );
};

export default Heading;

"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@clerk/nextjs/server";
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@clerk/nextjs";
const MainDashboard = () => {
    const router=useRouter()
    const searchParams = useSearchParams()
    const{userId}=useAuth()
  const search = searchParams.get('id');
  useEffect(()=>{
    if(search){
      const sendIdToFirebase=async()=>{
        try{
          await setDoc(doc(db,"users",`${userId}`),{
            userid:search
          })
        }catch(err){
          console.log(err)
        }
      }
      sendIdToFirebase()
    }
  },[search, userId])
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to samuel&apos;s Jotion
      </h2>
      <Button onClick={()=>router.push("/dashboard/create")}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Upload data
      </Button>
    </div>
  );
};

export default MainDashboard;

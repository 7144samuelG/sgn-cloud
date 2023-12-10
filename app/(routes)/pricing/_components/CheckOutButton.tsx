"use client"
import { Button } from "@/components/ui/button";
import { db } from "@/firebase";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React,{ useState,useEffect } from "react";

const CheckOutButton = () => {
    const [loading,setLoading]=useState(true)
    const[paid,setPaid]=useState(false)
    const{userId}=useAuth()
   const router=useRouter()
    useEffect(()=>{
        const getData=async()=>{
            const docRef = doc(db, "users",`${userId}`);
            const docsnap = await getDoc(docRef);
            if(docsnap.exists()){
                setPaid(true)
            }
        }
        getData()
    },[userId])
    
    const CheckOutSession=async()=>{
        if(paid){
            router.push("https://sgn-cloud.vercel.app/dashboard")
        }
        const{data}=await axios.post("/api/paymentControllers",{
            priceId:"price_1O93t9KkDPUMN62jBXslaIdB"
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })
        window.location.assign(data)
        
        // const docRef=await addDoc(collection(db,"customers"),{
        //     id:userId,
        //     price:12,
        //     success_url:`${window.location.origin}/dashboard`,
        //     cancel_url:window.location.origin
        // })
    }
    return ( 
        <>
        <Button onClick={CheckOutSession} className=" py-3 w-full flex items-center
              mt-8  rounded-md bg-indigo-800 px-3.5 text-center text-sm
               font-semibold leading-6 text-white
              shadow-sm hover:bg-indigao-800 focus-visible:outline 
              focus-visible-outline-2 focus-visible-outline-offset-2
              focus-visible-outline-offset-2 focus-visible:outline-indigo-600
               cursor-pointer disabled:opacity-80
              ">
            {paid?"Already Subscribed":"subscribe"}
        </Button>
        </>
     );
}
 
export default CheckOutButton;
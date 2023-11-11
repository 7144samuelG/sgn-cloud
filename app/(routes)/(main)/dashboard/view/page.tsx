"use client";
import { db, storage } from "@/firebase";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Delete, DeleteIcon, Download, DownloadCloud, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation"
import { doc, getDoc, updateDoc } from "firebase/firestore";
const uuidv1 = require("uuid");

const ViewDownloadFiles = () => {
  const router=useRouter()
  const [imageurls, setImageUrls] = useState<string[]>([]);
  const { userId } = useAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const newArr: string[]=[]
  useEffect(() => {
    listAll(ref(storage, `files/${userId}`)).then((res) => {
      res.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          
          setImageUrls((data) => [...data, url]);
        // setImageUrls((data:string[])=>{
        //   imageurls.forEach((element)=>{
        //     if(!newArr.includes(element)){
        //       newArr.push(element)
        //     }
        //   })
        // })
        });
      });
    });
   
  }, [userId]);
  
const deleteItems=async(dat:string)=>{
  const docRef=doc(db,"limits",`${userId}`);
  const docsnap=await getDoc(docRef);
  if(docsnap.exists()){
    const limitdata=docsnap.data()!.limit;
    await updateDoc(docRef,{
      limit:limitdata-1
    })
  }
  const deleteRef=ref(storage,dat);
  deleteObject(deleteRef).then(()=>{
    toast.success("file deleted successfully")
    window.location.reload();
  }).catch((err)=>{
    toast.error("failed to delete the file")
  })
}
  return(
  <div className="mt-[50px]">
    {imageurls.length!=0 ? (
      imageurls?.map((ite) => (
        <div key={ite} className="px-2 border-t py-2">
          <div className="flex space-x-10">
            <p className=" text-sm">{ite.slice(0, 100)}</p>
            <p>image</p>
            <Download />
            <Button onClick={()=>deleteItems(ite)}>
            <Trash2 />
            </Button>
          </div>
        </div>
      ))
    ) : (
      <div className="w-full h-[100vh] flex justify-center items-center border">
<Button className="flex items-center space-x-2 justify-center" onClick={()=>router.push("/dashboard/create")} >
  <Plus/>
  uplaod files
</Button>

      </div>
    )}
  </div>
)
};

export default ViewDownloadFiles;

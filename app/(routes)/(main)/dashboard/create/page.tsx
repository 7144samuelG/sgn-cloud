"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db, storage } from "@/firebase";
import { useAuth, useUser } from "@clerk/nextjs";
import { setUserId } from "firebase/analytics";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker";
import { useRouter } from "next/navigation";

import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";
const uuidv1 = require("uuid");
const PublishNewFile = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [unlimited, setUnlimited] = useState(false);
  const { userId } = useAuth();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
   };
  const uploadFiles = async (e: any) => {
    const docRef = doc(db, "users",`${userId}`);
    const docsnap = await getDoc(docRef);
    const limitRef = doc(db, "limits",`${userId}`);
    const limitsnap = await getDoc(limitRef);
    let limitData;
    if (docsnap.exists()) {
      setUnlimited(true);
    } else if (!limitsnap.exists()) {
      // await addDoc(collection(db, `limit/${userId}`), {
      //   limit: 1,
      // });
      await setDoc(doc(db, "limits", `${userId}`), {
        limit:1
      });
    } else {
      limitData = limitsnap.data()!.limit;
      const updateRef = doc(db, "limits", `${userId}`);
      await updateDoc(updateRef, {
        limit: limitData+1
      });
    }
    if (name === null || file === null) {
      toast.error("failed file is empty");
      return;
    }
    if(limitData>4){
      toast.error("limit number of uploads reached upgrade to premium to enjoy")
      return
    }

    e.preventDefault();
    try {
      setLoading(true);
      toast.loading("uploading file");
      const imageRef = ref(storage, `files/${userId}/${uuidv1.v4()}`);
      uploadBytes(imageRef, file).then(() => {
        setLoading(false);
        toast.success("successfully uploaded file to sgn-cloud");

        //update

        router.push("/dashboard");
      });
    } catch (err) {
      toast.error("failed to upload file");
    }
  };

  return (
    <div className="flex items-center h-full border">
      <Card className="w-full mx-10 lg:w-[50%] lg:mx-auto">
        <CardHeader>
          <CardTitle>Create a New File</CardTitle>
          <CardDescription>Enter the fail you want to upload</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="w-full grid items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="name of the file"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="file">Choose document</Label>
                <Input
                  id="name"
                  type="file"
                  onChange={handleFileChange}
                  placeholder="Upload file"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button onClick={uploadFiles} disabled={loading}>
            Upload
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default PublishNewFile;

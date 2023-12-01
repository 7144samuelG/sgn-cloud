"use client";
import { db, storage } from "@/firebase";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Download, Plus, Share, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileShare from "../_components/share";
import prettyBytes from 'pretty-bytes';
import Link from "next/link";
const ViewDownloadFiles = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [value, setValue] = useState<string>("");
  const [imageurls, setImageUrls] = useState<string[]>([]);
  const { userId } = useAuth();
  useEffect(() => {
    listAll(ref(storage, `files/${userId}`)).then((res) => {
      res.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImageUrls((data) => [...data, url]);
        });
      });
    });
  }, [userId]);

  const deleteItems = async (dat: string) => {
    const deleteRef = ref(storage, dat);
    const docRef = doc(db, "limits", `${userId}`);
    const docsnap = await getDoc(docRef);
    if (docsnap.exists()) {
      const limitdata = docsnap.data()!.limit;
      await updateDoc(docRef, {
        limit: limitdata - 1,
      });
    }
    deleteObject(deleteRef)
      .then(() => {
        toast.success("file deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("failed to delete the file");
      });
  };
  const copyUrls = async (urls: string) => {
    setValue(urls);
    toast.success("copied");
  };
  const shareUrls = async (urls: string) => {};
  const handleDownload = (ite:string) => {
    if (ite) {
      // Create an anchor element to trigger download
      const link = document.createElement('a');
      link.href = ite;
      link.download = ite;
      link.click();
    }
  };
  return (
    <div className="mt-[50px] overflow-x-scroll">
      {imageurls.length != 0 ? (
        imageurls?.map((ite) => (
          <div key={ite} className="px-2 border-t py-2">
            <div className="flex items-center space-x-10">
              <p className=" text-sm w-full lg:w-[60%]">{ite.substring(43)}</p>
              <div className="">
                <CopyToClipboard text={ite} onCopy={() => setCopied(true)}>
                  <Button
                    onClick={() => toast.success("copied")}
                    className=""
                  >
                    copy
                  </Button>
                </CopyToClipboard>
              </div>
              <div>
                <a href={ite} target="_blank" className="underline-none text-white">download</a>
              </div>
              <Button
                onClick={() => deleteItems(ite)}
                className=""
              >
                <Trash2 />
              </Button>
              <Button onClick={() => shareUrls(ite)} className="">
                <FileShare file={ite} />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-[100vh] flex justify-center items-center border">
          <Button
            className="flex items-center space-x-2 justify-center"
            onClick={() => router.push("/dashboard/create")}
          >
            <Plus />
            uplaod files
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViewDownloadFiles;

"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import CheckOutButton from "./_components/CheckOutButton";

const clounds = [
 
  {
    name: "Free",
    price: null,
    id:null,
    des: "Every thing you need for your data storage",
    features: [
      "Fast, scalable, and durable cloud storage",
      "Lower pricing and lower costs",
      "Security-first architecture",
      "Advanced block storage",
      "High-performance block storage at any scale"
    ],
  },
  {
    name: "Business",
    price: "$5.99",
    id:"pay",
    des: "Level up you data staorage and more enhanced safety and access",
    features: [
      "Fast, scalable, and durable cloud storage",
      "Lower pricing and lower costs",
      "Security-first architecture",
      "Advanced block storage",
      "High-performance block storage at any scale"
    ],
  }
];

const Pricing = () => {
  const[redirect,setReditect]=useState<boolean>()
  const[starter,setStarter]=useState();
  const [premium,setPremium]=useState()
  useEffect(() => {
    fetPrices();
  }, []);
  const [prices, setPrices] = useState([]);
  const fetPrices = async () => {
    const { data } = await axios.get("/api");
    setPrices(data);
  };

  console.log(prices);
  return (
    <div className=" mx-3 md:mx-auto mt-[100px] grid max-w-md grid-cols-1 mb-3 gap-8 lg:max-w-4xl lg:grid-cols-2">
      {clounds.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl
           ring-1 ring-gray-900/10 sm:p-10"
        >
          <div>
            <h3 className="text-base font-semibold leading-7 text-indigo-600">
              {item.name}
            </h3>
            <div className="mt-4 flex items-baseline gap-x-2">
              {item.price ? (
                <>
                  <span className="text-3xl font-bold tracking-light text-gray-900">
                    {item.price}
                  </span>
                  <span className="text-base font-semibold leading-7 text-gray-600">
                    /month
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold tracking-tight text-gray-900">
                  $0.00
                </span>
              )}
            </div>
            <p className="mt-6 text-base leading-7 text-gray-600">{item.des}</p>
            <ul
              role="list"
              className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
            >
              {item.features.map((feat) => (
                <li className="flex gap-x-3" key={feat}>
                  <CheckIcon className="h-6 w-5 flex-none text-indigo-600 aria-hidden" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {item.id?(
              <CheckOutButton/>
            ):(
              <Link href="/dashboard" className=" py-3
              mt-8 block rounded-md bg-indigo-800 px-3.5 text-center text-sm
               font-semibold leading-6 text-white
              shadow-sm hover:bg-indigao-800 focus-visible:outline 
              focus-visible-outline-2 focus-visible-outline-offset-2
              focus-visible-outline-offset-2 focus-visible:outline-indigo-600
               cursor-pointer disabled:opacity-80
              ">Enter</Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pricing;

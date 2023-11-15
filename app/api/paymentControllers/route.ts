import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from '@clerk/nextjs';
export async function POST(request:Request){
    const {userId} = auth();
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
    const res=await  request.json();
    let priceId=res.priceId;
    const session=await stripe.checkout.sessions.create({
        line_items:[
            {
                price:priceId,
                quantity:1
            }
        ],
        mode:"subscription",
        success_url:`https://sgn-cloud.vercel.app/dashboard?id=${userId}`,
        cancel_url:"https://sgn-cloud.vercel.app"
    })
    return NextResponse.json(session.url)
}
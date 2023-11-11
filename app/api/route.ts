import { NextResponse } from "next/server";
import Stripe from "stripe";
// export async function Get(request: Request) {
//   const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

//   return NextResponse.json({mess:"h"})
// }
export async function GET(request: Request) {
  // ...
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
     const prices = await stripe.prices.list({
     limit: 2,
  });
  return NextResponse.json(prices.data.reverse())
}
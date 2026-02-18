// app/api/bill/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Node.js runtime w app routerze

export async function GET() {
  try {
    const { GraftConfig, BillingLogic } = await import("@graft/nuget-EnergyPriceService");

    GraftConfig.host =
      "wss://gc-d-ca-polc-demo-ecbe-01.blackgrass-d2c29aae.polandcentral.azurecontainerapps.io/ws";

    const bill = await BillingLogic.CalculateMonthlyBill(88.4, 1.4, 23);

    return NextResponse.json({ bill });
  } catch (err) {
    console.error("API bill error:", err);
    return NextResponse.json({ error: "Failed to fetch bill" }, { status: 500 });
  }
}

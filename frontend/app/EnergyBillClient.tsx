"use client";

import { useState, useEffect } from "react";
import Card from "./components/Card";

export default function EnergyBillClient() {
  const [bill, setBill] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadBilling = async () => {
      const { GraftConfig, BillingLogic } = await import("@graft/nuget-EnergyPriceService");
      GraftConfig.host =
        "wss://gc-d-ca-polc-demo-ecbe-01.blackgrass-d2c29aae.polandcentral.azurecontainerapps.io/ws";
      const result = await BillingLogic.CalculateMonthlyBill(88.4, 1.4, 23);
      if (mounted) setBill(result);
    };

    loadBilling();
    return () => { mounted = false; };
  }, []);

  return (
    <Card title="Monthly Energy Bill">
      {bill === null ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <p className="text-green-600 font-bold text-xl">{bill.toFixed(2)} EUR</p>
      )}
    </Card>
  );
}

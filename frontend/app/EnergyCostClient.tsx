"use client";

import { useState, useEffect } from "react";
import Card from "./components/Card";

interface EnergyCostClientProps {
  previousReadingKwh: number;
  currentReadingKwh: number;
  currency: string;
}

export default function EnergyCostClient({
  previousReadingKwh,
  currentReadingKwh,
  currency,
}: EnergyCostClientProps) {
  const [cost, setCost] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadCost = async () => {
      try {
        const { EnergyPriceCalculator, GraftConfig } = await import(
          "@graft/nuget-MyEnergyService"
        );

        GraftConfig.host = "ws://localhost/ws";

        const result = await EnergyPriceCalculator.GetMyCurrentCost(
          previousReadingKwh,
          currentReadingKwh,
          currency
        );

        if (mounted) setCost(result);
      } catch (err) {
        console.error("Failed to fetch energy cost:", err);
      }
    };

    loadCost();

    return () => {
      mounted = false;
    };
  }, [previousReadingKwh, currentReadingKwh, currency]);

  return (
    <Card title="Current Energy Cost">
      {cost === null ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <p className="text-blue-600 font-bold text-xl">
          {cost.toFixed(2)} {currency}
        </p>
      )}
    </Card>
  );
}

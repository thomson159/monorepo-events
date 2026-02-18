import EnergyBill from "./EnergyBill";
import EnergyCostClient from "./EnergyCostClient";

export default function Home() {
  const previousReading = 1500;
  const currentReading = 1550;
  const currency = "EUR";

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Energy Dashboard
      </h1>
      <EnergyBill />
      <EnergyCostClient
        previousReadingKwh={previousReading}
        currentReadingKwh={currentReading}
        currency={currency}
      />
    </div>
  );
}

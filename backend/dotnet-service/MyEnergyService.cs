using graft.nuget.EnergyPriceService;
using graft.pypi.currency_converter.converter;

namespace MyEnergyService;

public class EnergyPriceCalculator
{
    static EnergyPriceCalculator()
    {
        graft.nuget.EnergyPriceService.GraftConfig.Host="wss://gc-d-ca-polc-demo-ecbe-01.blackgrass-d2c29aae.polandcentral.azurecontainerapps.io/ws";
        var config = string.IsNullOrEmpty(Environment.GetEnvironmentVariable("GRAFT_CONFIG")) ?
            "licenseKey=f7GZ-De6k-Mx4p-t7FN-q5DC\nname=graft.pypi.sdncenter_currency_converter;host=inMemory;modules=currency_converter;runtime=python" :
        Environment.GetEnvironmentVariable("GRAFT_CONFIG");
        graft.pypi.sdncenter_currency_converter.GraftConfig.setConfig(config);
    }

    public static double GetPrice()
    {
        return new Random().Next(100, 105);
    }

    public static double GetMyCurrentCost(int previousReadingKwh, int currentReadingKwh)
    {
        var consumption = MeterLogic.NetConsumptionKWh(previousReadingKwh, currentReadingKwh);
        return consumption * GetPrice();
    }

    public static double GetMyCurrentCost(int previousReadingKwh, int currentReadingKwh, string currency)
    {
        var consumption = MeterLogic.NetConsumptionKWh(previousReadingKwh, currentReadingKwh);

        var convertedValue = SimpleCurrencyConverter.convert(consumption * (float)GetPrice(), "USD", currency);
        return convertedValue;
    }
}

# MyEnergyService

## All backend base on https://academy.graftcode.com/quick-start

`MyEnergyService` is a simple .NET 8 service for calculating electricity costs in a selected currency, using Graft packages:

- `graft.nuget.EnergyPriceService` – for fetching energy prices
- `graft.pypi.sdncenter-currency-converter` – for currency conversion

## Features

- Retrieves the current energy price (randomly between 100–105 for demo purposes)
- Calculates energy consumption costs based on meter readings
- Supports conversion to different currencies

## Run

```bash
dotnet build .\MyEnergyService.csproj
dotnet publish .\MyEnergyService.csproj

docker stop graftcode_demo
docker rm graftcode_demo

docker build --no-cache --pull -t myenergyservice:test .
docker run -d -p 80:80 -p 81:81 --name graftcode_demo myenergyservice:test

```

## Graft Configuration

The project uses Graft configuration as shown below:

```bash
graft.nuget.EnergyPriceService.GraftConfig.Host = "wss://gc-d-ca-polc-demo-ecbe-01.blackgrass-d2c29aae.polandcentral.azurecontainerapps.io/ws";

var config = string.IsNullOrEmpty(Environment.GetEnvironmentVariable("GRAFT_CONFIG"))
    ? "licenseKey=f7GZ-De6k-Mx4p-t7FN-q5DC\nname=graft.pypi.sdncenter_currency_converter;host=inMemory;modules=currency_converter;runtime=python"
    : Environment.GetEnvironmentVariable("GRAFT_CONFIG");

graft.pypi.sdncenter_currency_converter.GraftConfig.setConfig(config);
```

⚠️ Warning: The above license key is for demonstration only and should not be used in production.

## Usage Example

```bash
using MyEnergyService;

var cost = EnergyPriceCalculator.GetMyCurrentCost(1000, 1025); // default currency
var costInEUR = EnergyPriceCalculator.GetMyCurrentCost(1000, 1025, "EUR");
Console.WriteLine($"Cost: {cost}, Cost in EUR: {costInEUR}");
```

## Docker

Sample Dockerfile for running the service with Graftcode Gateway (GG):

```bash
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /usr/app

# Install wget, python3-dev, and download GG
RUN mkdir -p /usr/app \
    && apt-get update \
    && apt-get install -y wget python3-dev \
    && wget -O /usr/app/gg.deb https://github.com/grft-dev/graftcode-gateway/releases/latest/download/gg_linux_amd64.deb \
    && dpkg -i /usr/app/gg.deb \
    && rm /usr/app/gg.deb \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy compiled binaries
COPY /bin/Release/net8.0/publish/ /usr/app/

EXPOSE 80
EXPOSE 81

# Run Graftcode Gateway exposing modules
CMD ["gg", "--modules", "/usr/app/MyEnergyService.dll"]
```

## Running GG Locally

# ⚠️ dotnet --version 9.0.311

For testing, you can run GG with an example project key and specify the module:

```bash
sudo gg --projectKey eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTljNmU3Ni03N2RlLTcwOTQtOGNlZi0zMWMzZTkzZjVkMDIiLCJnYXRld2F5X25hbWUiOiJ3b3JkeS1lbmdsaXNoLWVsbSIsInBpZCI6IjAxOWM2ZTAzLWNmZWUtNzE1NC04NGRhLWMyNDgxZDMyYzZjNSIsInByb2plY3RfbmFtZSI6Im1vY2tlZC15ZWxsb3dzdG9uZSIsImlhdCI6MTc3MTM3OTc4MywibmJmIjoxNzcxMzc5NzgzLCJleHAiOjE3ODcwMTgxODMsImlzcyI6ImdyYWZ0Y29kZS1nYXRld2F5IiwiYXVkIjoiZ3JhZnRjb2RlLWFwaSJ9.QnU2VoTFTNkx5zPjArj4ADFlHCCtKcoIzBjsVe1bka0
```

-

```bash
--modules /home/embe/Desktop/monorepo-events/backend/dotnet-service/bin/Release/net8.0/MyEnergyService.dll
```

⚠️ Warning: Use your own path

Using sudo helps bind the ports correctly – without it, GG may fail to start due to port conflicts.

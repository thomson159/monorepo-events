FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /usr/app

# Install wget, python3 + python3-dev and download GG
RUN mkdir -p /usr/app \
 && apt-get update \
 && apt-get install -y \
    wget \
    python3-dev \
 && wget -O /usr/app/gg.deb \
    https://github.com/grft-dev/graftcode-gateway/releases/latest/download/gg_linux_amd64.deb \
 && dpkg -i /usr/app/gg.deb \
 && rm /usr/app/gg.deb \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
 
# You just need to copy your binaries with public interfaces
COPY /bin/Release/net8.0/publish/ /usr/app/

EXPOSE 80
EXPOSE 81
# And run Graftcode Gateway passing name of modules that should be exposed
CMD ["gg", "--modules", "/usr/app/MyEnergyService.dll"]

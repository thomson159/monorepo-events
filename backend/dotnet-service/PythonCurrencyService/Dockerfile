FROM python:3.11-slim
WORKDIR /usr/app

# Install our demo sdncenter-currency-converter python module from PyPI into a local folder
RUN pip install sdncenter-currency-converter --target ./sdncenter_currency_converter 

# Install wget and download Graftcode Gateway (GG)
RUN mkdir -p /usr/app  \
    && apt-get update \
    && apt-get install -y wget \
    && wget -O /usr/app/gg.deb \
    https://github.com/grft-dev/graftcode-gateway/releases/latest/download/gg_linux_amd64.deb \
    && dpkg -i /usr/app/gg.deb \
    && rm /usr/app/gg.deb \
    && apt-get clean \ 
    && rm -rf /var/lib/apt/lists/*

# Run Graftcode Gateway pointing at that module
CMD ["gg", "--modules", "/usr/app/sdncenter_currency_converter/", "--httpPort", "91","--port","90","--TCPServer", "--tcpPort=9092"]

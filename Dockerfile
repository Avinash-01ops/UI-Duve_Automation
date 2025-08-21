FROM mcr.microsoft.com/playwright:v1.54.2-jammy

# Install Java for Allure report viewing
RUN apt-get update && apt-get install -y openjdk-11-jre --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# Cache browsers are already installed in base image

ENV CI=1

CMD ["npx", "playwright", "test"]


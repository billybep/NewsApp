# Dockerfile for expo development
FROM node:18-bullseye

# Install dependencies untuk React Native & Expo
RUN apt-get update && apt-get install -y \
  git \
  build-essential \
  watchman \
  openjdk-17-jdk \
  python3 \
  && apt-get clean

# Create app directory
WORKDIR /app

# Install ngrok secara eksplisit sebelum yang lain
RUN npm install -g @expo/ngrok@^4.1.0 --unsafe-perm

# Copy onliy package files first for caching
COPY package.json packaga-lock.json* yarn.lock* ./

# Install deps
RUN npm install

# Copy the rest project
COPY . .

# Expose expo ports
EXPOSE 19000 19001 19002

# Default: start expo with tunnel
CMD ["npx", "expo", "start", "--tunnel"]
FROM node:18-bullseye

# Install dependencies untuk React Native & Expo
RUN apt-get update && apt-get install -y \
  git \
  watchman \
  openjdk-17-jdk \
  python3 \
  && apt-get clean

# Install Expo CLI
RUN npm install --global expo-cli

# Set working directory
WORKDIR /app

# Default command
CMD ["sh", "-c", "npm install && npx expo start --tunnel"]

FROM node:18-bullseye

# Install dependencies untuk React Native & Expo
RUN apt-get update && apt-get install -y \
  git \
  watchman \
  openjdk-17-jdk \
  python3 \
  && apt-get clean

  WORKDIR /app

# Init project
RUN npx create-expo-app . --template expo-template-blank-typescript

# Install deps
RUN npm install

CMD ["npx", "expo", "start", "--tunnel"]
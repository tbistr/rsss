FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:18-bullseye

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get install -y \
    fish \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g yarn

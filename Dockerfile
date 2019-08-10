FROM node:10-buster AS builder

WORKDIR /build

ADD . .

RUN apt-get update && \
    apt-get install -y build-essential libpcap-dev && \
    npm install && \
    npm run build

FROM node:10-buster
WORKDIR /app

COPY --from=builder /build/dist/ .
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json .
COPY --from=builder /build/package-lock.json .

RUN apt-get update && \
    apt-get install -y libpcap0.8 && \
    rm -rf /var/lib/apt/lists/*


# 📘 Chapter 4: Caching & Compression with NGINX

In this chapter, I’ll explore **how to make websites faster** using:
- **Proxy Caching** → Store backend responses in NGINX for reuse.
- **Gzip Compression** → Reduce response size before sending to clients.

---

## 🎯 Learning Goals
- Enable caching for faster responses.
- Configure cache location & expiration.
- Enable gzip compression.
- Test the improvements.

---

## 📂 Folder Structure

```
chapter-04-caching-compression/
├── README.md
├── configs/
│ └── nginx.conf
├── app/
│ ├── server.js
│ └── Dockerfile
└── docker-compose.yml
```

---

## Step 1: Backend App
We’ll simulate a **slow API** by adding a delay:

**`app/server.js`**

```
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/api/data', (req, res) => {
  // Simulate slow response (2 seconds)
  setTimeout(() => {
    res.json({ message: "Hello from backend 🚀", timestamp: new Date() });
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

```

app/Dockerfile

```
FROM node:18-alpine
WORKDIR /usr/src/app
COPY server.js .
RUN npm init -y && npm install express
CMD ["node", "server.js"]
```

## Step 2: NGINX Config with Caching & Gzip

configs/nginx.conf

```
events {}

http {
    # Define cache storage
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=100m inactive=60m use_temp_path=off;

    server {
        listen 80;

        location /api/ {
            proxy_pass http://app:3000;
            proxy_cache my_cache;
            proxy_cache_valid 200 10s;   # Cache responses for 10 seconds
            add_header X-Cache-Status $upstream_cache_status;
        }

        # Enable gzip compression
        gzip on;
        gzip_types text/plain application/json text/css application/javascript;
        gzip_min_length 256;
    }
}
```

## Step 3: Docker Compose Setup

docker-compose.yml

```
version: '3.8'

services:
  app:
    build: ./app
    container_name: backend_app
    ports:
      - "3000:3000"

  nginx:
    image: nginx:latest
    container_name: nginx_cache
    ports:
      - "8080:80"
    volumes:
      - ./configs/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app
```

## 🌐 Step 4: Run & Test

Start everything:

docker-compose up --build


Now test the API:

```
curl -i http://localhost:8080/api/data

```

First request → Takes ~2 seconds (fetched from backend).

Response header → X-Cache-Status: MISS

Second request (within 10s) → Instant response!

Response header → X-Cache-Status: HIT

## 📊 Step 5: Test Compression

Check if gzip is working:

```
curl -H "Accept-Encoding: gzip" -I http://localhost:8080/api/data
```
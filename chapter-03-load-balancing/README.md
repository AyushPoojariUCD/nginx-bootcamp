# 🚀 Next up: Chapter 3 – Load Balancing with NGINX


---

In this chapter, you’ll learn how NGINX can distribute traffic across multiple backend servers (instead of just one), improving performance and reliability.


# 📘 Chapter 3: Load Balancing with NGINX

In this chapter, I’ll configure **NGINX as a load balancer** to distribute requests across multiple backend services.  
This is one of the most powerful features of NGINX in real-world production systems.

---

## 🎯 Learning Goals
- Understand the concept of load balancing.
- Configure NGINX upstreams.
- Run multiple backend servers.
- Verify round-robin request distribution.

---

## 📂 Folder Structure

```
chapter-03-load-balancing/
├── README.md
├── configs/
│   └── nginx.conf
├── app/
│   ├── server1.js
│   ├── server2.js
│   └── Dockerfile
└── docker-compose.yml
```


---

## ⚡ Step 1: Backend Apps
We’ll create **two Node.js servers**:

**`app/server1.js`**
```js
const express = require('express');
const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello from Backend Server 1 🚀');
});

app.listen(PORT, () => {
  console.log(`Server 1 running on port ${PORT}`);
});


app/server2.js

const express = require('express');
const app = express();
const PORT = 3002;

app.get('/', (req, res) => {
  res.send('Hello from Backend Server 2 🎯');
});

app.listen(PORT, () => {
  console.log(`Server 2 running on port ${PORT}`);
});


app/Dockerfile

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "server1.js"]


We’ll override which server file runs using command: in docker-compose.

⚡ Step 2: NGINX Load Balancer Config

configs/nginx.conf

events {}

http {
    upstream backend_servers {
        server app1:3001;
        server app2:3002;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend_servers;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}


upstream backend_servers → Defines a pool of servers.

NGINX will use round-robin load balancing by default.

⚡ Step 3: Docker Compose Setup

docker-compose.yml

version: '3.8'

services:
  app1:
    build: ./app
    container_name: backend_app1
    volumes:
      - ./app:/usr/src/app
    command: ["node", "server1.js"]
    ports:
      - "3001:3001"

  app2:
    build: ./app
    container_name: backend_app2
    volumes:
      - ./app:/usr/src/app
    command: ["node", "server2.js"]
    ports:
      - "3002:3002"

  nginx:
    image: nginx:latest
    container_name: nginx_load_balancer
    ports:
      - "8080:80"
    volumes:
      - ./configs/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app1
      - app2

🌐 Step 4: Run & Test

Start everything:

docker-compose up --build


Now test with multiple requests:

curl http://localhost:8080


Expected alternating responses:

Hello from Backend Server 1 🚀
Hello from Backend Server 2 🎯


Refresh multiple times in your browser → requests should alternate between Server 1 and Server 2.

📊 Step 5: Logs

Check logs to confirm load balancing:

docker-compose logs -f app1
docker-compose logs -f app2


You should see requests hitting both servers.

✅ What You Learned

How to configure NGINX as a load balancer.
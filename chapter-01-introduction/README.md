# 📘 Chapter 1: Introduction to NGINX

Welcome to the **first chapter** of my **NGINX Bootcamp** 🚀.  
In this chapter, I’ll start with the basics of **running NGINX** and **serving a static website** using Docker.

---

## 🎯 Learning Goals
- Understand what NGINX is and why it’s used.
- Run NGINX using Docker.
- Serve a static HTML page.
- Explore how configuration files work.

---

## 🏗 Folder Structure

```
chapter-01-introduction/
├── README.md
├── configs/
│ └── nginx.conf
├── static-site/
│ └── index.html
└── docker-compose.yml
```

---

## ⚡ Step 1: Run NGINX with Docker
First, make sure you have **Docker** and **Docker Compose** installed.

Run the following command from inside this folder:

```bash
docker-compose up --build
This will:

Pull the latest nginx image.

Map port 8080 → 80 (so you can access via http://localhost:8080).

Mount the custom configuration (configs/nginx.conf) and static site.

📄 Step 2: NGINX Configuration
Here’s the minimal configuration (configs/nginx.conf) used in this chapter:

nginx
Copy code
events {}

http {
    server {
        listen 80;
        server_name localhost;

        location / {
            root /usr/share/nginx/html;
            index index.html;
        }
    }
}
listen 80; → Tells NGINX to listen on port 80 inside the container.

root /usr/share/nginx/html; → Location where static files are served from.

index index.html; → Default page served when visiting /.

🌐 Step 3: Static Site
Inside static-site/index.html:

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NGINX Bootcamp</title>
</head>
<body>
  <h1>Welcome to NGINX Bootcamp - Chapter 1 🚀</h1>
  <p>Serving a static site with NGINX</p>
</body>
</html>
🔍 Step 4: Test It
Once the container is running, open your browser and go to:

👉 http://localhost:8080

You should see:

vbnet
Copy code
Welcome to NGINX Bootcamp - Chapter 1 🚀
Serving a static site with NGINX
📊 Step 5: Explore Logs
Check container logs:

bash
Copy code
docker-compose logs -f nginx
You’ll see access logs whenever you visit the page.
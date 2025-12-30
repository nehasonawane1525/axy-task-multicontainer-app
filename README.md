# 🚀 Multi-Container Docker Application (Frontend + Backend + Database)

This project demonstrates a simple **multi-tier web application** using **Docker Compose**, consisting of:

- **Frontend**: React application served via **Nginx**
- **Backend**: Node.js (Express) REST API
- **Database**: PostgreSQL

All services communicate over a **private Docker network**, and **only the frontend is exposed** to the host machine.

---

## 🧱 Architecture Overview

```text
Browser
   |
   |  http://localhost:8080
   v
Frontend (React + Nginx)
   |
   |  /api/* (Nginx reverse proxy)
   v
Backend (Node.js / Express)
   |
   v
PostgreSQL Database
```
---

## ⚙️ Prerequisites

Before running the application, make sure you have the following installed:

- **Docker**  
- **Docker Compose**  
- **Git** (optional, for cloning the repository)

---
## 2️⃣ Create Environment Configuration

Create a `.env` file in the root directory of the project:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=<POSTGRES_USER>
DB_PASSWORD=<POSTGRES_PASSWORD>
DB_NAME=<POSTGRES_DB_NAME>

FRONTEND_PORT=<FRONTEND_PORT>
```
---
## 3️⃣ Run the Application

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/nehasonawane1525/axy-task-multicontainer-app.git
cd axy-task-multicontainer-app
```
Build and start all services using Docker Compose:

```bash
docker compose up --build -d

```
- Docker Compose will:
- Create a private Docker network
- Start PostgreSQL with persistent storage
- Start the backend API
- Build and serve the frontend using Nginx

---

## 🌐 Access the Application

Open your browser and navigate to:

```bash

http://localhost:8080

```
Note: Use public IP of server if you are using EC2 instance

---

# ✅ How to Verify It’s Working

## 1️⃣ Frontend Verification

**Visit:**

```bash
http://localhost:8080

```
Note: Use public IP of server if you are using EC2 instance

**Expected output:**
```bash
Hello World from Frontend
```

This confirms the frontend container is running and accessible.

---

## 2️⃣ Backend Verification (Via Frontend)

From the frontend UI, click on **check backend** button to call the backend API.

Expected response:

```json

{
  "message": "Backend is running",
  "db_time": "2025-xx-xxTxx:xx:xx.xxxZ"
}

```
This confirms:

- Frontend → Backend communication
- Backend → PostgreSQL database connectivity

---

## 3️⃣ Network Isolation Verification

Try accessing the backend directly from the host:

```text

http://localhost:3000/api/health

```

❌ This should not be accessible.

Try connecting to PostgreSQL from the host:

```text

http://localhost:5432

```

❌ Connection should be refused.

✅ This confirms that only the frontend is exposed, while backend and database remain private.

---

## 🧠 Design Decisions & Assumptions

**Nginx Is Used**

- Serves the React build efficiently
- Acts as a reverse proxy for backend API requests
- Avoids CORS issues by keeping requests on the same origin
- Provides a single public entry point
---

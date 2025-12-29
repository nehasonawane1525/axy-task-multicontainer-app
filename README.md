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

---
## Prerequisites

Make sure the following are installed on your system:

- Docker
- Docker Compose
- Git (optional, for cloning the repository)

---

## How to Run the Application

### Step 1: Clone the Repository

```bash
git clone https://github.com/nehasonawane1525/axy-task-multicontainer-app.git
cd axy-task-multicontainer-app


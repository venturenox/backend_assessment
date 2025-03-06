# Kafka Todo App

This project demonstrates a **Kafka-based microservice architecture** using a **TodoList Service** (Producer) and a **Notification Service** (Consumer).

---

## Project Structure

```text
/kafka-todo-app
│── /todolist-service         # TodoList API Service (Kafka Producer)
│   ├── app.js                 # Main Application Logic
│   ├── producer.js            # Kafka Producer Logic
│── /notification-service      # Notification Service (Kafka Consumer)
│   ├── app.js            # Main Application
│   ├── consumer.js            # Kafka Consumer Logic
│── docker-compose.yml         # Kafka & Zookeeper setup only
│── README.md                   # Project Documentation
```

---

## Setup and Run Instructions

### Step 1: Start Kafka using Docker Compose
Kafka are required for event communication between services.

Run the following command in the project root:

```bash
docker-compose up -d
```

This will start:
- Zookeeper on port `2181`
- Kafka Broker on port `3002`

---

### Step 2: Start TodoList Service (Producer)
This service exposes REST APIs to create, update, and delete tasks. Each action emits an event to Kafka.

```bash
cd todolist-service
npm install
node app.js
```

This will start the service on:
```
http://localhost:3000
```

---

### Step 3: Start Notification Service (Consumer)
This service listens for task events from Kafka and logs notifications to the console.

```bash
cd notification-service
npm install
npm start
```

---

## API Documentation (For Postman Testing)

| Method | Endpoint          | Description             | Example Request Body |
|--------|------------------|-------------------------|----------------------|
| POST   | `/tasks`          | Create a new task       | `{ "title": "Learn Kafka" }` |
| PUT    | `/tasks/:id`      | Update an existing task | `{ "title": "Learn Advanced Kafka" }` |
| DELETE | `/tasks/:id`      | Delete a task           | - |

### Base URL
```
http://localhost:3000
```

---

## Kafka Integration Details

| Topic        | Description |
|--------------|-------------|
| `task-events` | Used to transfer task lifecycle events (create, update, delete) from `todolist-service` to `notification-service`. |

### Events Published
| Event Key   | Description               |
|-------------|------------------|
| `task_created` | When a new task is created |
| `task_updated` | When an existing task is updated |
| `task_deleted` | When a task is deleted |

---

## Author
- **Farhan Ali** 

# API Aggregator
API Aggregator is a lightweight backend application built with Node.js, GraphQL, and TypeScript. It leverages PostgreSQL for data storage and runs in a Docker containerized environment. The application features sample implementations for integrating with external APIs such as GitHub and GitLab, showcasing its capability to aggregate data from multiple sources. Designed with scalability in mind, it can be easily extended to support additional endpoints. 

### Technologies
- Node.js, TypeScript
- GrpahQL
- PostgreSQL
- Prisma ORM
- Docker
- Jest

## 🔧 Prerequisites

Ensure you have the following installed:
Make sure you have Node.js, Docker, and PostgreSQL installed on your local machine. If not, you can set them up using the links below:
- Node.js - https://nodejs.org/en/download 
- PostgreSQL - https://www.postgresql.org/download/
- Docker - https://www.docker.com/

## 🚀 Setting Up Locally
- Clone or download the repository from GitHub.

- Move the application to your preferred folder.

- Run npm install to install dependencies.

- Rename the `.env.sample` file to `.env.

- Open the `.env` file and update it with your database credentials.

- Update the database connection and port details in `docker-compose.yaml`.

- Run the app using Docker `Docker compose up` or your preferred method.

### Testing locally
- Access the browser apollo graphql studio by using `http://localhost:13000/api`
  (⚠️ Replace 13000 with your custom port if you updated it in docker-compose.yaml.)

- If you have postman (https://www.postman.com/) installed in your local environment you can use it or use online postman application if you are comfortable with it.


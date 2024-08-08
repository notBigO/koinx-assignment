# Node.js Trade Management API

## Overview

This project is a Node.js backend application designed to handle trade data. It allows you to upload CSV files containing trade information, process the data, and interact with a MongoDB database. Additionally, the API provides endpoints for balance calculations based on trade data. This application is dockerized for deployment and hosted on an AWS EC2 instance.

## Features

- **CSV File Upload**: Upload CSV files containing trade information. The application parses the CSV, processes the data, and stores it in MongoDB.
- **Balance Calculation**: Retrieve balance information based on trade data.
- **Error Handling**: Handles common errors such as file upload issues and data validation.

## Tech Stack

- **Node.js**: Backend framework for building the API.
- **Express**: Web framework for Node.js.
- **Multer**: Middleware for handling file uploads.
- **Prisma**: ORM for interacting with MongoDB.
- **Docker**: Containerization platform.
- **AWS EC2**: Cloud service for hosting the application.
- **Terraform**: Infrastructure as code tool for provisioning AWS resources.

## Getting Started

### Prerequisites

- Node.js (v16.x or later)
- Docker
- AWS CLI (for managing AWS resources)
- Terraform (for provisioning AWS resources)
- MongoDB (Atlas or local instance)

### For EC2 deployed testing ONLY

**Health Check Endpoint**

- **URL:** `http://13.201.56.56/`
- **Method:** `GET`
- **Description:** This endpoint checks the health of the application. Replace `http://13.201.56.56/` with the public IP address of your EC2 instance. You should receive a simple response indicating that the server is running correctly.

- Sample Request

```bash
curl -X GET http://13.201.56.56/
```

**File Upload Endpoint**

- **URL:** `http://13.201.56.56/api/upload`
- **Method:** `POST`
- **Description:** This endpoint allows you to upload a CSV file for processing.

**Steps to Test:**

1.  Use a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to send a POST request.
2.  In Postman, select `POST` as the method and set the URL to `http://13.201.56.56/api/upload`.
3.  In the `Body` tab, select `form-data`, then choose `File` as the type and upload a CSV file of your choice.
4.  Send the request and check the response to ensure that the file is processed correctly and the data is uploaded to the database.

- Sample Request

```bash
curl -X POST http://13.201.56.56/api/upload \
     -F "file=@sample.csv"
```

**Balance Retrieval Endpoint**

- **URL:** `http://13.201.56.56/api/balance`
- **Method:** `POST`
- **Description:** This endpoint retrieves the balance based on the timestamp provided in the request body.

**Steps to Test:**

1.  Use a tool like Postman or cURL to send a POST request.
2.  In Postman, select `POST` as the method and set the URL to `http://13.201.56.56/api/balance`.
3.  In the `Body` tab, select `raw` and choose `JSON` as the format. Enter the following JSON payload:

    ```json
    {
      "timestamp": "2024-08-08T00:00:00Z"
    }
    ```

4.  Replace the `timestamp` with a valid ISO 8601 date-time string according to your data.
5.  Send the request and verify that the response contains the correct balance information based on the provided timestamp.

- Sample Request

```bash
curl -X POST http://13.201.56.56/api/balance \
     -H "Content-Type: application/json" \
     -d '{"timestamp": "2024-08-08T00:00:00Z"}'
```

### For Local Testing ONLY

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/koinx-assignment.git
   cd koinx-assignment
   ```

2. **Install Dependencies**

   Navigate to the project directory and install the required dependencies:

   ```bash
   npm install

   ```

3. **Setup Environment Variables**

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```bash
   MONGODB_URI=your_mongodb_uri
   ```

   Replace your_mongodb_uri with your actual MongoDB connection string.

4. **Build and Run with Makefile**

   The project includes a `Makefile` to simplify common tasks. Ensure you have [Make](https://www.gnu.org/software/make/) installed on your machine.

   Run the following command to build the Docker image and run it:

   ```bash
   make all
   ```

   To stop the container, run:

   ```bash
   make stop
   ```

   To clean up, run:

   ```bash
    make clean
   ```

5. **Testing the Application**

   After setting up and running the application, you can test the following endpoints:

   **Health Check Endpoint**

   - **URL:** `http://localhost:3000/`
   - **Method:** `GET`
   - **Description:** This endpoint checks the health of the application. It should return a simple response indicating that the server is running correctly.

   **File Upload Endpoint**

   - **URL:** `http://localhost:3000/api/upload`
   - **Method:** `POST`
   - **Description:** This endpoint allows you to upload a CSV file for processing. A sample CSV file named `sample.csv` is provided in the root directory for testing purposes.

   **Steps to Test:**

   1. Use a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to send a POST request.
   2. In Postman, select `POST` as the method and set the URL to `http://localhost:3000/api/upload`.
   3. In the `Body` tab, select `form-data`, then choose `File` as the type and upload the `sample.csv` file.
   4. Send the request and check the response to ensure that the file is processed correctly and the data is uploaded to the database.

   **Balance Retrieval Endpoint**

   - **URL:** `http://localhost:3000/api/balance`
   - **Method:** `POST`
   - **Description:** This endpoint retrieves the balance based on the timestamp provided in the request body.

   **Steps to Test:**

   1. Use a tool like Postman or cURL to send a POST request.
   2. In Postman, select `POST` as the method and set the URL to `http://localhost:3000/api/balance`.
   3. In the `Body` tab, select `raw` and choose `JSON` as the format. Enter the following JSON payload:

      ```json
      {
        "timestamp": "2024-08-08T00:00:00Z"
      }
      ```

   4. Replace the `timestamp` with a valid ISO 8601 date-time string according to your data.
   5. Send the request and verify that the response contains the correct balance information based on the provided timestamp.

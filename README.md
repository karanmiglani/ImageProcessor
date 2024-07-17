<h1>Image Processing Service</h1>
This project is a Node.js application for processing images from CSV files. It provides APIs for file upload, status checking, and webhook integration.

Features
File Upload: Upload CSV files containing image URLs.
Image Processing: Download, compress, and save images locally.
Status Checking: Check the processing status of uploaded CSV files.
Webhook Integration: Notify external systems once processing is completed.
Technologies Used
Node.js
Express.js
Multer: For handling file uploads.
Sharp: For image processing.
Mongoose: For MongoDB object modeling.
csv-writer: For writing CSV files.
uuid: For generating unique IDs.
dotenv: For environment variable management.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/image-processing-service.git
cd image-processing-service
Install dependencies:
bash
Copy code
npm install
Set up your environment variables in a .env file:
makefile
Copy code
PORT=3000
MONGO_URI=your_mongodb_connection_string
Start the server:
bash
Copy code
npm start
API Endpoints
File Upload
URL: /api/upload
Method: POST
Description: Upload a CSV file containing image URLs.
Response:
200 OK with { requestId } on successful upload.
400 Bad Request if the file is not a CSV.
Status Checking
URL: /api/status
Method: GET
Description: Check the processing status of the uploaded CSV file.
Query Parameters: requestId
Response:
200 OK with { status, completedAt, fileUrl } if the request is found.
404 Not Found if the request ID is not found.
Webhook Handler
URL: /api/webhook
Method: POST
Description: Handle webhook notifications once processing is completed.

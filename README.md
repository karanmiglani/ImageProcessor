<h1>Image Processing Service</h1>
This project is a Node.js application for processing images from CSV files. It provides APIs for file upload, status checking, and webhook integration.
<hr>

<b>Features</b>
<ul>
<li><b>File Upload:</b> Upload CSV files containing image URLs.</li>
<li><b>Image Processing:</b> Download, compress, and save images locally.</li>
<li><b>Status Checking:</b> Check the processing status of uploaded CSV files.</li>
<li><b>Webhook Integration:</b> Notify external systems once processing is completed.</li>
</ul>
<b>Technologies Used</b> <br>
<li>Node.js</li>
<li>Express.js</li>
<li>Multer: For handling file uploads.</li>
<li>Sharp: For image processing.</li>
<li>Mongoose: For MongoDB object modeling.</li>
<li>csv-writer: For writing CSV files.</li>
<li>uuid: For generating unique IDs.</li>
<li>dotenv: For environment variable management.</li>
<br>

<b>API Endpoints</b>
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

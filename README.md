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
<br>
<b>File Upload</b>
<li>URL: /api/upload</li>
<li>Method: POST</li>
<li>Description: Upload a CSV file containing image URLs.</li>
<li>Response:</li>
<li>200 OK with { requestId } on successful upload.</li>
<li>400 Bad Request if the file is not a CSV.</li>
<b>Status Checking</b>
<li>URL: /api/status</li>
<li>Method: GET</li>
<li>Description: Check the processing status of the uploaded CSV file.</li>
<li>Query Parameters: requestId</li>
<li>Response:</li>
<li>200 OK with { status, completedAt, fileUrl } if the request is found.</li>
<li>404 Not Found if the request ID is not found.</li>
<b>Webhook Handler</b>
<li>URL: /api/webhook</li>
<li>Method: POST</li>
<li>Description: Handle webhook notifications once processing is completed.</li>

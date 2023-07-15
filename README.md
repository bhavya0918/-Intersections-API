Express-NodeJS Intersections API
This is an Express-NodeJS application that provides an API for finding intersections between a long linestring and a set of scattered lines. The API is protected with header-based authentication and utilizes the turf.js library for the intersection calculations.

API Endpoints
POST /api/intersections
Protected: This endpoint requires authentication. Include the authentication token in the Authorization header as Bearer <your-auth-token>.
Request Body: The request body should contain a GeoJSON linestring with 5,000 points.
Response: The API returns one of the following:
An empty array [] if there are no intersections between the linestring and the scattered lines.
An array of intersecting line IDs along with the point of intersection.
An error message with a 5XX status code if the linestring is invalid.
An error message with a 4XX status code if the request body or authentication header is missing or malformed.
Installation and Usage
Make sure you have Node.js installed on your system.

Clone this repository to your local machine or download the source code.

Install the dependencies by running the following command:

Start the application with the following command:

The API will be accessible at http://localhost:3000/api/intersections.

To test the API, you can use tools like Postman or cURL. Send a POST request to http://localhost:3000/api/intersections with the following details:

Headers:
Authorization: Bearer <your-auth-token>
Content-Type: application/json
Request Body:
{
  "linestring": "<GeoJSON linestring>"
}
Replace <your-auth-token> with the actual authentication token.
Replace <GeoJSON linestring> with the desired linestring data.
Additional Notes
The scattered lines data used in the API is loaded from a JSON file (scattered_lines.json). Make sure to replace it with your own data source or adjust the code accordingly.
Logs for incoming requests and errors are generated by the application.
The code adheres to the ESLint code standards.
The API can be tested using Postman or cURL as described in the "Installation and Usage" section above.

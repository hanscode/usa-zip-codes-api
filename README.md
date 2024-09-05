# US Zip Codes REST API
Author - Hans Steffens

## Project Overview

A simple REST API for accessing USA zip code information, including latitude, longitude, and city/state details. This API also supports querying zip codes by state, city, and finding nearest locations using latitude/longitude. The API provides an accurate and up-to-date database of US Zip Codes. It's been built from the ground up using authoritative sources including the U.S. Postal Service™, U.S. Census Bureau, National Weather Service, American Community Survey, and the IRS.

## Features

- Retrieve details for a specific zip code (city, state, latitude, longitude).
- Query all zip codes for a given state with pagination.
- Query all zip codes for a given city with pagination.
- Built with Node.js, Express.js, SQLite, and Sequelize ORM.
- Easily extendable and modifiable for new features.

## 🛠 Installation & Set Up

1. Install dependencies

   ```sh
   npm install
   ```

2. Start the development server

   ```sh
   npm start

The server should now be running at http://localhost:5000/.

> [!NOTE]  
> <b>Additional note for macOS Monterey (or higher) users:</b> <br />
> Apple introduced some changes with AirPlay when they launched macOS Monterey. Now, the AirPlay Receiver uses ports 5000 and 7000. You will need to follow <a href="https://support.apple.com/en-bw/guide/mac-help/mchl15c9e4b5/mac" target="_blank">these instructions</a> to turn off the AirPlay receiver, to be able to use port 5000 with this project.

## Usage

### API Endpoints

#### 1. Get Details for a Specific Zip Code

**Endpoint**: `/api/zipcode/:zip`

**Method**: `GET`

**Description**: Fetch details for a specific zip code, including city, state, latitude, and longitude.

**Example**:
    ```sh
    GET http://localhost:5000/api/zipcode/90210
    ```

**Response**:
    ```json
    {
    "zip": 90210,
    "city": "Beverly Hills",
    "state": "CA",
    "latitude": 34.09,
    "longitude": -118.41
    }
    ```

#### 2. Get All Zip Codes for a Specific State

**Endpoint**: `/api/state/:state`

**Method**: `GET`

**Description**: Retrieve all zip codes for a specific state with pagination.

**Parameters**:

- limit (optional): Number of records per page (default is 10).
- offset (optional): Number of records to skip (useful for pagination).

**Example**:
    ```sh
    GET http://localhost:5000/api/state/CA?limit=20&offset=0
    ```
**Response**:
    ```json
    {
    "count": 20,
    "rows": [
        {
        "zip": "90001",
        "city": "Los Angeles",
        "state": "CA",
        "latitude": 34.0522,
        "longitude": -118.2437
        },
        ...
    ]
    }
    ```
#### 3. Get All Zip Codes for a Specific City

**Endpoint**: `/api/city/:city`

**Method**: `GET`

**Description**: Retrieve all zip codes for a specific city with pagination.

Parameters:

- limit (optional): Number of records per page (default is 10).
- offset (optional): Number of records to skip.

**Example**:
    ```sh
    GET http://localhost:5000/api/city/New+York?limit=20&offset=0
    ```

**Response**:
    ```json
    {
    "count": 20,
    "rows": [
        {
        "zip": "10001",
        "city": "New York",
        "state": "NY",
        "latitude": 40.7128,
        "longitude": -74.0060
        },
        ...
    ]
    }
    ```
#### 4. Error Handling
The API will return the following error responses:

- **404 Not Found**: If no zip codes are found for a `city/state`.
- **500 Internal Server Error**: If something goes wrong on the server.

#### 5. Query Parameters
The API supports pagination using `limit` and `offset` query parameters. For example:
    ```sh
    /api/state/CA?limit=10&offset=10
    ```
## Contributing
We welcome contributions! Please follow the steps below:

- Fork the repository.
- Create a feature branch (`git checkout -b feature/your-feature`).
- Commit your changes (`git commit -am 'Add some feature'`).
- Push to the branch (`git push origin feature/your-feature`).
- Open a pull request.

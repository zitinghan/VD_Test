# VD_Test

This a HTTP API test from VD. For simple test, please use the example given and data exist in the database.

Host IP: 3.1.64.251

Total 3 API
GET - Retieve data with Key
Input: params /[key]
Output: key, value, createAt and updateAt
Example: http://[host]:3000/api/vc/0001

GET - Retieve the correct version based on data with Key & Params Query
Input: params /[key]?timestamp=[time in second]
Output: key, value, createAt and updateAt
Example: http://[host]:3000/api/vc/0001?timestamp=1557067784000

POST - Save new Key and value with current timestamp
Input Body: {key: value}
Output: key, value, createAt and updateAt
Body Format: application/json
Example: http://[host]:3000/api/vc/
Example body: {"0001": "first data"}

Example test
1. Get first version data - http://3.1.64.251:3000/api/vc/001?timestamp=1557067780000
2. Get second version data - http://3.1.64.251:3000/api/vc/001?timestamp=1557067786000
3. Get version data based on time - http://3.1.64.251:3000/api/vc/001?timestamp=1557067784000

### Prerequisites

1. NodeJS - Server hosted at AWS EC2
2. MongoDB Atlas

### Installing

1. Clone the project
2. NPM install for initialize
3. Make sure the MondoDB is active

Development
- npm run dev

Build production project
- npm run build

Start the production project
- npm run server

Test the test flow
- npm run test

## Running the tests

6 steps to check overall flow

1. Post first data through API
2. Get first data, check 1st value
3. Post second data through API
4. Get second data, check 2nd value
5. Validate the actual value by minus milisecond from last value time
6. Remove all the testing data

Added 2 more step for post verification
1. Test first data error format
2. Test get with empty key - 404 error

## Deployment

Task manager - PM2

## Authors

* **Zi Ting Han** 
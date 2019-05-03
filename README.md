# VD_Test# VD_Test

This a HTTP API test from VD. 

Total 3 API

GET - Retieve data with Key
Input: params /[key]
Output: key, value, createAt and updateAt
Example: http://[host]:3000/api/vc/0001

GET - Retieve the correct version based on data with Key & Params Query
Input: params /[key]?timestamp=[time in second]
Output: key, value, createAt and updateAt
Example: http://[host]:3000/api/vc/0001?timestamp=1556785180000

POST - Save new Key and value with current timestamp
Input Body: {key: value}
Output: key, value, createAt and updateAt
Body Format: application/json
Example: http://[host]:3000/api/vc/
Example body: {"0001": "first data"}

### Prerequisites

1. NodeJS
2. MongoDB

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

## Deployment

Task manager - PM2

## Authors

* **Zi Ting Han** 
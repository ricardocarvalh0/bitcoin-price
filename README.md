# Requirements

## Frontend (React): 
- We will develop our backend api to fetch the bitcoin price data 
- “Backend” section below describes the details of the backend api 
- We will display the Bitcoin price and calculator in a box 
- We should use websocket to receive the latest Bitcoin price from backend server 
- It will be a bonus if we can show a simple animation when the price changes 
- At the bottom of the box there will be an input box to enter the amount of \$ we have and when we enter the $ amount and while we are typing a label below the input will display the Bitcoin amount.
- When the box is clicked, we will display a line chart to display the price changes 
- We will retrieve the last 10 rows from backend api 
- The design sketch can be found at the “Design” section below 
- Using tailwind for the CSS is bonus 
- We can use any library that we are comfortable with 
- For line chart or state management etc 

## Backend (NodeJS): 
-  We will use https://api.coindesk.com/v1/bpi/currentprice.json API to fetch data 
-  We will do request to "currentprice.json" API in 30 sec interval and will keep the received data in an SQLite database table (https://www.sqlite.org/index.html) 
-  We need to create and configure the SQLite database 
-  We can use only 1 table to store price data to simplify the table design
-  We can use more tables if needed 
-  Alsowhenwereceive the data we should send that to FE side by using websocket 
-  Weneed1endpoint to retrieve last 10 rows from bitcoin price table 
-  Thisendpoint will be used in the line chart 
-  Wecanuseexpress or similar NodeJS framework to simplify the api development 
-  Tosimplify development api endpoints will be directly accessible 
-  Noauthentication mechanism is needed

# Running

## Separated

### server
- ```npm install```
- ```npm run start```
- http://localhost:3001

### client: 
- ```cd client```
- ```npm install```
- ```npm run start```
- http://localhost:3000

## Only server using react's /build folder
### server
- ```npm install```
- - ```npm run build```
- ```npm run start```
- http://localhost:3001/


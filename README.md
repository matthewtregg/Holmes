# Holmes 

## App description
This is a full stack React app I created to add and explore UK crimes. It uses the UK police open data api and consists of four main screens in the front-end. This is served by a Koa backend that allows a user to add crimes at a location - on top of crimes already reported in the UK police api. 

SCREEN 1 LANDING PAGE 

![alt text](https://github.com/matthewtregg/Holmes/blob/master/Screenshot%202019-07-06%20at%2008.27.17.png)

On the landing page a user can choose to navigate to a screen where one can either: 

a) Add crimes 
b) Search for reports of existing crimes
c) Obtain crimes stats at a given location

SCREEN 2 ADDING CRIMES

![alt text](https://github.com/matthewtregg/Holmes/blob/master/Screenshot%202019-07-06%20at%2015.21.07.png)

SCREEN 3 SEARCHING FOR CRIMES

![alt text](https://github.com/matthewtregg/Holmes/blob/master/Screenshot%202019-07-06%20at%2015.23.56.png)
 
SCREEN 4 CRIME STATS AT A GIVEN LOCATION

![alt text]()

## Technologies used 
-Mongo DB (geo-json) using Mongoose
-React 
-React Router
-Koa 
-Google Maps API
-Vx-React

## Running the application
The application is currently deployed at https://5d204b09cd227cf3a60674d0--dreamy-kowalevski-14184f.netlify.com/.

To run the client locally:

Navigate to the client folder
run npm install
run npm start
Navigate to http://localhost:3000/

To run the server locally

Navigate to the server folder
run npm install
run node index.js

## Configuration
the following dependencies are needed in your dot.env: 

Within the client folder: you need to obtain your own 
Within the server folder:



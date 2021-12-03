# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Steo 1: Run the requirements file in both Jukebox and server folder using the following command:

pip install -r requirements.txt

Step 2:
IMPORTANT UPDATE: 

we had created the server.js in the src folder of my main application however please move it out of the jukebox folder to its parent directory and save it. 

Copy the package.json file as well. we have a small manual change in the file to ensure the Nodemon is running correctly. 
Change:   Added this "devStart": "nodemon server.js" and run server as  “$npm run devStart”.

Step 3:
Make sure you are on JukeBox and do 
"npm start" and run server

Keep listening and Keep Rocking !!!!!!!!!!!!!!!!

As we have a backend server supporting our application we could not successfuly deploy the application even after trying our best to do so:

https://jukeboxfrontend.herokuapp.com/  is our application but this fails to run as the application need AccessToken to connect to the server. 


Tutorials used in the project: 


https://blog.webdevsimplified.com/
https://stackoverflow.com/
https://geeksforgeeks.com/

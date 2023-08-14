# First of all
Hello! if you are interested in this project, please read the lines below. I'm a computer engineering student and this is my first fullstack project. I expect it to not be perfect and I will be comming back periodically to improve it. Anyways, if you want to test it out or have a look I would really appreciate any feedback you can give me, I'm here to learn and any help is nice!

# Project explanation:
This project is a web app which objective is helping people to keep track and encourage to complete their daily tasks.
The opetarion is based on cards for each day of the week. In this cards you have independent tasks for each day which can be deleted or marked as done. By marking the tasks done your score will increase.
This repository contains the frontend of the application, which needs the backend API running to work correctly

# The API
This project utilizes an API located in https://github.com/eaybgui/reactive-api repository.
The project architecture follows a client-server approach, where the client (this repository) communicates with the server (the API) to exchange data and perform operations.
By interacting with the API, various actions can be performed, such as creating new tasks, retrieving details about specific tasks, updating the status of a task, removing a task and obtaining and updating the total score.

# Features
The app has a first part which lets you focus on your actual day tasks, showing the card corresponding to the actual day and some extra information. The weather information is obtained via ip from an open api (http://api.weatherapi.com/v1).
Only the todos from the actual day can be marked as done. The backend will refresh the todos once every week so they can be marked as done again while saving your score.

# Getting the backend up
You can get the backend working by adding a .env file in the backend and defining there the variables MONGODB_URI with a valid mongodb database url, PORT as any port you want to use (default is 3001, if you want to use any other port you should change the url defined in /utils/config.js in the frontend) and SECRET as any string you want to use.

# Final thoughts
As you can see, this project might not have the best styling (the login page is not styled at all). This is because it is my first React and fullstack project, and I wanted to focus in understanding the fundamentals of the interaction with this framework in the fronted, and the fundamentals of connections, requests and error handling in the backend. It has really teached me a lot about this and I think I have understood well the things I have learned here. I will come back to this project when I have more time (and money) to end this project by adding more ways to identify users, have a proper styling and more features and finally sending it to production. If you have read all this and you have tested the project (or not) I would really appreciate any feedback you can give me, I'm here to learn.
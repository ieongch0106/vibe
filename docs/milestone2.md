# Milestone 2
## Heroku App
https://vibe.herokuapp.com/client/
## Breakdown 
Chou Heng Ieong - Implemented front-end and back-end of login page, sign up page and location page.<br>
Created server/index.js and implemented 3 routing methods. Created database/user.json to store user's data. Deploy Heroku App<br>
Mohammed Aaquil Khan - Implemented home and host webpages. Home webpage reads from a json file named parties.json and displays 5 parties as a list on the webpage. Host webpage allows the user to enter the data related to the party being hosted and then stores the data in parties.json file.<br>
.<br>
.<br>
## Representation of APIs for Vibe
### /login <br>
**GET** method and the query of request contains an username and password. This API will only be called in the 'signin.html'<br>
It checks if the username is in database. If the username is not in the database, the server will send a status code of 404 Not Found to the client.<br>
If the username is in the database, the server then verify if the password is correct or not.<br>
The server will send a status code of 200 Success if it's correct. Else it will send 401 Unauthorized to the client.<br>
![log_in](https://user-images.githubusercontent.com/71384413/164307377-a001a1c5-c36b-462c-8d68-468d4e2cf876.png)
### /user/register <br>
**POST** method and the query of the request contains an username and password. This API will only be called in the 'signup.html'<br>
It checks if the username is in database. If the username is taken, the server will send a status code of 409 Conflict to the client.<br>
If the username is not taken, the server adds the new user object to database/user.json and sends a status code of 200 Success to the client.<br>
![user_register](https://user-images.githubusercontent.com/71384413/164307393-87b7743c-71d2-4612-adc0-0fd80d6a0bbc.png)
### /user/profile/zipcode/new <br>
**POST** method and the query of the request contains an username and a zip code. This API will only be called in the 'location.html'.<br>
User can only get access to 'location.html' after they registered to be a Viber. In other words, The server does not need to verify the user authentication on 'location.html'.<br>
The server finds the user object and adds member 'zipcode' and the value of the user's input to the database/user.json. Then the server sends a status code of 200 Success to the client. <br>
![add_zip_code](https://user-images.githubusercontent.com/71384413/164312977-c265f20b-d91a-46a0-b335-9003b5de6308.png)
## Client Interface
### log in page
User enters username and password. After the button is clicked, we pass the username, password and **'GET'** method to the **/login** API by using fetch. Then the server method will verify user authentication.
![signin](https://user-images.githubusercontent.com/71384413/164315087-009cb022-0660-46c0-8c75-01d6b1f05e64.jpg)
### sign up page
The client first checks if the password contains at least 8 characters after the button is clicked by the user. If true, then we pass the username, password and **'POST'** method to the **/user/register** API by using fetch. <br>
Then the server method will check if the username exists in the database. If existed, then the server will send code 409. Else, it will send status code 200.
![signup](https://user-images.githubusercontent.com/71384413/164319853-919d5658-397e-454d-9fd1-97c83143b907.jpg)
### location page
The client side checks if the zip code input contains exactly 5 digits. If the input is exactly 5 digits, the color will turn green, else it's red.<br>
After the button is clicked, the client checks if the value of zip code is exactly 5 digits. If it's not, it sends the error message to the client from the server.<br>
If it's exactly 5 digits, we pass the username, zip code and **'POST'** method to the **/user/profile/zipcode/new** API by using fetch. <br>
Then the server will find the user object in the database and adds member 'zipcode' to the object.
![location](https://user-images.githubusercontent.com/71384413/164320859-ec94d78a-8b5f-4f8a-ba85-4215b8995737.jpg) 
### Find Parties
The user using the **'GET'** method will receive a list of all the parties created that are saved on ther server, if no perty exists it will send an error.
### Add Song to Party Queue
The user using the **'POST'** method by fetching from the /createparty it will then fetch again from the spotify api from their music library to check if the song exists. Once the song is found and valid it can be added to the server of songs created, in that specific party. If the song does not exist an error message will be shown saying Song does not exist. 


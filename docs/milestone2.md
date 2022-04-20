# Milestone 2
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

# 1
## runtime_error
# 2
## vibe
# 3
## Spring 2022
# 4
## It is an application where users can find local parties in their area and submit their song suggestion in that party.
# 5
## Juliano Wahab, MopolyWasHere
## Mohammed Aaquil Khan, aaquilk10
## Chou Heng Ieong, ieongch0106
## Arnav Mohan, arnav0201
# 6
## login
• Every application needs a log in page to obtain user's identification and authentication.
![Screenshot 2022-03-26 214943](https://user-images.githubusercontent.com/71384413/160263243-748596fb-7f64-4ca2-8947-6f9ca386d6db.jpg)
## register
• A page for the user to sign up to become a Viber or a member of the application.
![Screenshot 2022-03-26 214953](https://user-images.githubusercontent.com/71384413/160263208-97578d72-25ce-4159-be2d-e69ffca177dc.jpg)
## location
• get the location of the user so we can show the user the best parties near them
![Screenshot 2022-03-26 214925](https://user-images.githubusercontent.com/71384413/160263199-c855e159-1eee-49c3-995e-aae2f2f2dd64.jpg)
# 7 
## login
**POST** method and the form body in HTML contains an username and password. This API will only be called in the 'index.html'<br>
We use auth.authenticate to check if the username and password are correct/in mongodb. If yes, the page will be redirected to home.html, else it will be redirected back to the login page.
## register
**POST** method and the form body in HTML contains an username and password. This API will only be called in the 'signup.html'<br>
If the username is not taken, it adds the new user object to mongodb collection and redirect to location.html.<br>
Else, it will be redirected back to signup.html.
## location
The client side checks if the zip code input contains exactly 5 digits. If the input is exactly 5 digits, the color will turn green, else it's red.<br>
If it's exactly 5 digits, we pass the username, zip code and **'POST'** method to the **/user/profile/zipcode/new** API by using fetch. <br>
Then the server will find the user object in the mongodb and adds member 'zipcode' to the object.

# 8
## USER: use mongodb to store the viber object that contains of username and password after the user registers to be a viber successfully. And in location.html after the user enters the zipcode and we'll add zipcode to the user object in mongodb 

# 9
## /login is used for the user to log into the vibe application. User needs to enter the correct username and password in order to logging into the application. User cannot get access to private pages unless they sign in.
## /register is used for the user to register to be a viber.
# 10
## User cannot get access to private pages like home page or party page unless they sign in.
# 11
## Entire project:
### Chou Heng Ieong: <br>summarize and clean up code, write documents.<br> <u>milestone1:</u> Designed wireframes, navigation bars and logo. Summarized and made changes and updated on html/css files. <br><u>milestone2:</u> Implemented front-end and back-end of login page, sign up page and location page. Created server/index.js and implemented 3 routing methods. Created database/user.json to store user's data. Deploy Heroku App <br><u>milestone3:</u> implemented auth.js, users.js and 3 routing methods in user-db.js: /login, /register and /user/profile/zipcode/new, changed database from user.json to mongodb. Heroku App deployment.
### Juliano Wahab: <br>summarize and clean up code, write documents.<br> <u>milestone1:</u> Summarized and made changes and updated on html/css files. <br><u>milestone2:</u> Implemented front-end and back-end of Explore Page, Party Page where you can add song on the Page. Created a server/index.js and implemented 3 routing methods. Created database/user.json to store Songs's data as well as the data of every Parties list of songs with likes. Deploy Heroku App <br><u>milestone3:</u> implemented 4 routing methods in user-db.js: /songRequest, /UpdateLikes and /song, used mongodb and deployed on Heroku App.
# 12

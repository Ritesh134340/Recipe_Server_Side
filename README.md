
# Recipe Web Application Using MERN Stack 


Welcome to our website! Our site is powered by the MERN stack, and we utilize the YouTube API to bring you the latest and most popular recipe videos on the web.

As a user, you can create an account, sign in,watch and start adding your favorite videos to your personal list. Our user-friendly interface makes it easy to find and save the content you love.



## Deployed Link :
https://awesomerecipe.netlify.app
## Features :-

**COMMON :**

- User/Admin will be redirected to respective page from the same login form based on role.
- User can Signup/Login using email or password, but there are two more ways to login/signup using Google and facebook.
- User can choose his profile picture to show it when user is logged in, it is stored on firebase storage. 
- While logging in password can be hide or show by clicking on given eye icon.

***There is a password reset option given using which password can be reset after verifying the OTP, which will be sent to user's registered email address using NodeMailer.***


**AS USER :**
- User can land on home page and watch different uploaded recipe videos.
- Any recipe video or channel name can be searched from the search bar given at top of the home page.
- On the home page click search functionality is used which gets data from server based on search text.
- All other search starts working if user starts typing, but there is pre-applied debouncing functionality to decrease the  rate of request made.
- User can see the available channel lists.
- Any recipe video can be saved inside favourites tab after clicking on AddtoFavourite button given.
- User must be logged in to save any recipe video into his favourite list otherwise he will be redirected to log in page.
- User can also remove any recipe from his favourite list.




**AS ADMIN :**

- Admin panel can be visited only if a user is logged in with correct credentials and has correct authorization which will be checked from database.
- After successful log in admin can add new Channels.
- Admin can add new videos inside any existing channel.
- Admin will have access to watch any uploaded videos or delete any video.
- There is a tab where admin can see all the available users and any user can be deleted from database. 
- There are search options given on all required pages, which can be used to get required data in less time.
- All search input has pre-applied debouncing functionality.
- Admin can directly change home page carousel image and hero image from admin dashboard.




## Tech Stack

**Client:**
 - React-Js
 - Redux
 - React-Router-Dom
 - Thunk
 -  React-Redux

 ### Supportive Client Library :

  ***Axios***,
  ***Styled-Components***,
  ***Jwt-Decode***,
   ***React-Icons***,
***React-Slick***,
***React-Tostify***,
 ***React-Youtube***,
 ***Uid***, 
 ***Javascript***,
 ***Html***,
  ***CSS***

**Server:** 
- Nodejs 
- Express 
- Mongodb 
- Mongoose

 ### Supportive Server Library :

 ***Passport js***,
 ***Firebase Storage***,
  ***NodeMailer***,
   ***Bcrypt***,
    ***Jsonwebtoken***,
    ***Cors***, 
    ***Passport-facebook***,
     ***Passport-google-auth20***,
       ***YoutubeApi***


## Screenshots

![App Screenshot](https://fitness-blender.netlify.app/)


## Run Locally :-

Clone the project

**Client-Repository :**

```bash
  https://github.com/Ritesh134340/Recipe_Client_Side.git
```


**Server-Repository :**

```bash
https://github.com/Ritesh134340/Recipe_Server_Side.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start Client server :

```bash
  npm run start
```

Start Backend server :

```bash
  nodemon index.js
```


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ritesh134340.github.io/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ritesh134340/)


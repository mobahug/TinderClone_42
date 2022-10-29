# Matcha the TinderClone

## by [ghorvath](https://github.com/mobahug), [vniemi](https://gitlab.com/vilniemi)

### Matcha is a dating webapplication using modern languages and tools.

Matcha is a dating website just like Tinder and we added a tons of feature what we believed a must have for a dating website.
Such as, real time notification and chat with socket.io, advance filter search, map with location update, etc.
Created in duo in 4.5month.
Made own ORM, validation and random usergenerator to populate the application, handle easier queryies, and get the right information.

## Tools & languages

PostgreSQL, React, Express, MUI, Nodejs,
Docker, pgadmin, DataGrip, Asana, Lucidchart,
CSS, HTML


# Features:

## Loging in and View Single Match

  - We have a basic login with UI response in case of error.
  - Two-step registration with email verification.
  - Forget password with email link token.
  - View single users
  - Like, dislike, view profile by open info bar
  - In case of more images, image slide show
  - User offline/online bar
  - Basic infos, fame, distance based on geolocation coordinates
  - Report user
  - Advance filter search


![viewmatch](https://user-images.githubusercontent.com/83179142/198826445-922df611-b4cb-4ce7-b08c-dfd8e860156f.gif)


## Explore people

  - Explore other people
  - Advance filter search with more option
  - On click check each profile


![explore2](https://user-images.githubusercontent.com/83179142/198826790-62ff4f6c-2062-46da-a02f-b828a8d7bfe9.gif)


## Notifications

  - Real time notifications and counter
  - On click notification can check the other users profile
  - Delete all notification functionalities


![notification](https://user-images.githubusercontent.com/83179142/198826956-94eee05a-f84e-4c93-b3f9-c1f2a289e2db.gif)


## Chat

  - Once liked two user each other get a chat box on the conversation list
  - Showing the other user profile picture and username
  - Last message
  - In case of closing the conversation the user will be disliked/blocked
  - Chat messages shows realtime
  - Showing new message old message
  - Multiple line row textfield to make easier see through what user sending
  - Chat users profile picture username
  - Message sent time


![chat](https://user-images.githubusercontent.com/83179142/198827405-2aa342ed-1a04-4b01-ad24-c6d2d0a765c0.gif)


## Chat notification

  - Chat notifications shows realtime


![chatnotif](https://user-images.githubusercontent.com/83179142/198827675-2e7ecbe2-526d-48e6-b4ef-79724760ebb8.gif)


## Profile

  - Change basic informations like username, password, email, firstname/lastname
  - Add more details like gender, preference, birthdate, bio
  - If no gender tag or profile picture can not use the application aka can't get acces to search other users
  - Add tags, no duplication,
  - Trending tags based on other users most used tags
  - Upload image to cards
  - Remove them
  - Profile picture marked
  - Real time save
  - Geolocation
  - Updated by clicking on the map somewhere
  - Get the logged in user coordinates and updating locations by click to the button
  - Zoom


![profile](https://user-images.githubusercontent.com/83179142/198827861-3e33f0bd-aa84-4595-b333-093ab0df20a7.gif)




# Installation:

Get docker [Docker](https://www.docker.com/) .

1. Clone the repository
2. Add to `.env` your email address and password

```
EMAIL_ADDRESS = <your email address>
EMAIL_PASSWORD = <your email password>
```

3. To build and start run: ./start-server.zsh
4. Go to `localhost:3001` in your browser

## Other tools

### access different containers

./access_client.zsh
./access_server.zsh
./access_db.zsh

directly access postgress manager
./postgress

### remove all containers

./remove_containers.zsh

### run tests inside server

./run_tests.zsh

### postgres dump and migration

./migrate_from_dump.zsh
./get_dump.zsh

### generate random users to db

./db_migrate_add_users.zsh

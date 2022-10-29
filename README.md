# Matcha the TinderClone

## by [ghorvath](https://github.com/mobahug), [vniemi](https://gitlab.com/vilniemi)

### Matcha is a dating webapplication using modern languages and tools.

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


![viewmatch](https://user-images.githubusercontent.com/83179142/198826445-922df611-b4cb-4ce7-b08c-dfd8e860156f.gif)



## Installation:

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

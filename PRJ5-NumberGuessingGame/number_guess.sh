#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=number_guess -t -c"

# get random secret number
SECRET_NUMBER=$((RANDOM % 1000 + 1))

MAIN_MENU() {
  # read username
  echo "Enter your username:"
  read USERNAME

  # check maximum username
  USERNAME_COUNT=$(echo -n $USERNAME | wc -c)
  if (( $USERNAME_COUNT > 22 ))
  then
    echo "The username is invalid. Maximum username of 22 characters."
  else
    # get user information
    USER_INFO=$($PSQL "SELECT * FROM users WHERE username='$USERNAME'")
    
    # check user information not exist
    if [[ -z $USER_INFO ]]
    then
      echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
      
      GAMES_PLAYED=1
      PLAY_GAME

      BEST_GAME=$NUMBER_OF_GUESSES

      # insert into database
      $PSQL "INSERT INTO users(username,games_played,best_game) VALUES('$USERNAME',$GAMES_PLAYED,$BEST_GAME)" > /dev/null
    else
      read USER_ID BAR USERNAME BAR GAMES_PLAYED BAR BEST_GAME < <(echo $USER_INFO)
      echo -e "\nWelcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."

      ((GAMES_PLAYED++))
      PLAY_GAME

      # compare to update best_game
      if [[ "$NUMBER_OF_GUESSES" -lt "$BEST_GAME" ]] || [[ -z $BEST_GAME ]]
      then
        BEST_GAME=$NUMBER_OF_GUESSES
      fi

      # update new result to database
      $PSQL "UPDATE users SET games_played=$GAMES_PLAYED WHERE user_id=$USER_ID" > /dev/null
      $PSQL "UPDATE users SET best_game=$BEST_GAME WHERE user_id=$USER_ID" > /dev/null
    fi
  fi
}

NUMBER_OF_GUESSES=1

# play_game function 
PLAY_GAME() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  else
    echo -e "\nGuess the secret number between 1 and 1000:"
  fi

  read GUESS

  # check guess is not number
  if [[ ! $GUESS =~ ^[0-9]+$ ]] 
  then
    PLAY_GAME "That is not an integer, guess again:"
  else
    # the guess is higher
    if [[ $GUESS -gt $SECRET_NUMBER ]]
    then
      ((NUMBER_OF_GUESSES++))
      PLAY_GAME "It's lower than that, guess again:"
    # the guess is lower
    elif [[ $GUESS -lt $SECRET_NUMBER ]]
    then
      ((NUMBER_OF_GUESSES++))
      PLAY_GAME "It's higher than that, guess again:"
    # the secret number is guessed
    else
      echo -e "\nYou guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!\n"
    fi
  fi
}

# call main_menu function
MAIN_MENU

# TOTAL COMMITS
# 5a206ae (HEAD -> main) chore: add README.md and .gitignore
# acd9643 refactor: add comments
# 96f8a03 feat: insert result into database
# 0c0f1dd feat: compare to find the value of best_game
# 4c924bf feat: Add play_game function
# 548ed81 feat: add the existing check for the username
# ef0b6ee feat: add the reading of username and handling invalid case
# 61197aa feat: add random number
# 8e1dc36 Initial commit
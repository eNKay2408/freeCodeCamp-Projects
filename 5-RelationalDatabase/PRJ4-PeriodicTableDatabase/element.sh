#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t -c"

if [[ ! $1 ]]
then
  echo "Please provide an element as an argument."
else
  # get atomic number
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    # argument is atomic_number
    ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE atomic_number=$1")
  else
    # argument is symbol or name
    ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE symbol='$1' OR name='$1'")
  fi
  
  # if not exist
  if [[ -z $ATOMIC_NUMBER ]]
  then
    echo "I could not find that element in the database."
  else
    # get symbol, name
    SYMBOL=$($PSQL "SELECT symbol FROM elements WHERE atomic_number=$ATOMIC_NUMBER")
    NAME=$($PSQL "SELECT name FROM elements WHERE atomic_number=$ATOMIC_NUMBER")

    # get mass, melting, boiling, type id
    PROPERTIES=$($PSQL "SELECT * FROM properties WHERE atomic_number=$ATOMIC_NUMBER")
    read ATOMIC_NUMBER BAR MASS BAR MELTING BAR BOILING BAR TYPE_ID < <(echo $PROPERTIES)

    # get type name
    TYPE_NAME=$($PSQL "SELECT type FROM types WHERE type_id=$TYPE_ID")

    # delete extra space
    NAME=$(echo $NAME | sed -r 's/^ *| *$//g')
    SYMBOL=$(echo $SYMBOL | sed -r 's/^ *| *$//g')
    TYPE_NAME=$(echo $TYPE_NAME | sed -r 's/^ *| *$//g')

    # output result
    echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE_NAME, with a mass of $MASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."
  fi
fi
#!/bin/bash

up() {
    docker-compose --env-file .env.test -f docker-compose.test.yml up --build
}

down() {
    docker-compose --env-file .env.test -f docker-compose.test.yml down
}

MODE=$1

if [ "${MODE}" == "up" ]
then
  up
elif [ "${MODE}" == "down" ]
then
  down
else
  echo "ERROR: The \"up\" or \"down\" command must be in the parameter."
  exit 1
fi
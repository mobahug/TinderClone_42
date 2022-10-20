docker exec -it $(docker ps | grep server | awk '{print $1;}') /usr/local/bin/npm test -- --detectOpenHandles --forceExit

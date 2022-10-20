while [ "`docker inspect -f {{.State.Running}} matcha_server 2>/dev/null`" != "true" ]; do     sleep 0.1; done

docker exec $(docker ps | grep server | awk '{print $1;}') /usr/local/bin/db-migrate up  1>/dev/null

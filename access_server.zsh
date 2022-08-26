docker exec -it $(docker ps | grep server | awk '{print $1;}') /bin/bash

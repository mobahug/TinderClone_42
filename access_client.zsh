docker exec -it $(docker ps | grep client | awk '{print $1;}') /bin/bash

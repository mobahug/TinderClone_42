docker exec -it $(docker ps | grep db | awk '{print $1;}') /bin/bash

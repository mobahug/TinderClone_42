docker exec -it $(docker ps | grep postgres | awk '{print $1;}') pg_dump -U postgres postgres > backup.sql
docker cp $(docker ps | grep postgres | awk '{print $1;}'):/backup.sql .
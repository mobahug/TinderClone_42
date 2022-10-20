docker cp backup.sql $(docker ps | grep postgres | awk '{print $1;}'):/backup.sql
docker exec -it $(docker ps | grep postgres | awk '{print $1;}') psql -U postgres postgres < backup.sql

export DOCKER_CLIENT_TIMEOUT=10000
export COMPOSE_HTTP_TIMEOUT=10000
npm i
docker-compose build
./install.zsh &
docker-compose up
./db_migrate_add_users.zsh
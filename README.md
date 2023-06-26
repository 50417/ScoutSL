# Build the image

docker-compose build
docker-compose up

# close down the container

docker-compose down

# Clean up the container and image no longer in use

docker system prune -fa

# Confrim that the container and image is gone;

docker system df -v

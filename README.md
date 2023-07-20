# Installation

Tested on Ubuntu 18.04

node.js v16.15.1
npm 8.11.0

# To run
clone the repo 
```
cd api && npm install 
cd client  && npm install 
```
Update the  api/.env file.  
```
cd client && npm start
cd api && npm start 
```

## Docker Setup

### Build the image
```
docker-compose build
docker-compose up
```
### Close down the container
```
docker-compose down
```
### Clean up the container and image no longer in use
```
docker system prune -fa
```
### Confirm that the container and image is gone;
```
docker system df -v
```

# To run

git clone ....
npm start

NOTE: Make sure you have nodemon is installed in your system otherwise you can install as a dev dependencies in the project

# API resources

All project API router follows `/v1/project`
| # | Routers | Verbs | Progress | Is Private| Description |
|---| --------------------- | ----- | -------- | ----------| --------------------------------------------- |
| 1 | `/v1/project` | GET | TODO | Yes | Get all projects matching a query |
| 2 | `/v1/project/{id}` | GET | TODO | Yes | Get the project with the matching project |

# Build with docker

docker build -t node-app .
docker run -p 5000:5000 node-app .

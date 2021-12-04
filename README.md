
# CMPE202 Team 5 Group Project

## Team Members

- Qiong Wu
- Zhicheng Zhao
- Wai Yin Suen
- Benny Fung

## Tech stack
- MERN (Mongo, Express, ReactJS, Node)
- Hosting (AWS)

## Docker for Development
tl;dr

Make sure no mongod running in your host, run `sudo service mongod stop` for ubuntu to stop mongo service.

To start the docer, run `docker-compose up` on root directory

To stop the process, press `ctrl + c` or run `docker-compose down` on new terminal

### How it works
docker-compose looks for docker-compose.yml in the root directory and setup docker images based on it.  
In this project, there are three docker containers needed to complete the MERN stack.  
- frontend: reactjs and host with webpack, on port 8080
- backend: express for api service, on port 4000
- mongo: database connect with backend, on port 27017

It creates volume for mongo storage, to check there the volume located.  
`docker volume inspect team-project-fall21-cmpe202-team5_mongo-data`

It creates network for the 3 components to communicate with each other.  
`docker network inspect team-project-fall21-cmpe202-team5_team5-airline`

For fronend and backend, the image is built automatically if not already exist. the build instruction is in Dockerfile under each directory.

The volumes config for frontend is a trick for livereload when code is saved.
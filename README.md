
# CMPE202 Team 5 Group Project

AWS Site: [http://ec2-18-144-90-164.us-west-1.compute.amazonaws.com/](http://ec2-18-144-90-164.us-west-1.compute.amazonaws.com/)

Task Sheet: [https://docs.google.com/spreadsheets/d/16dyKwyQBKrVpK_JNGvuMJN9BWKi9-9cSHDcrT8O8SgE/edit?usp=sharing](https://docs.google.com/spreadsheets/d/16dyKwyQBKrVpK_JNGvuMJN9BWKi9-9cSHDcrT8O8SgE/edit?usp=sharing)


## Team Members

- Qiong Wu (Product Owner)
- Zhicheng Zhao (Developer)
- Wai Yin Suen (Scrum Master)
- Benny Fung (Developer) - Disappeared

## Contribution
- Wai Yin Suen: Scrum practice (Host meeting, Task sheet), Lead R&D, Frontend, Docker, AWS, Test Automation
- Qiong Wu: Product owner, Project board, User Story, Backend implementation, database dummy data
- Zhicheng Zhao: Class diagram, UI design, User Story, Reward backend (issue on updating mongodb)
- Benny Feng: Architecture Diagram, Flight booking backend (incomplete)

## Feature list
Completed:
- User Register
- User Login
- User Info Update
- Dashboard
- Flight Management
- Flight Search
- Flight Booking (UI)
- AWS Hosting
- Docker images

Not Complete due to missing member:
- Admin panel
- Reward Backend
- Flight Booking Backend
- Flight Management (UI)

## Tech stack
- Frontend: ReactJS + Redux
- Backend: Express + NodeJS
- Database: MongoDB
- Hosting: AWS
- Web testing: Robot Framework, Selenium
- API testing: Postman

## Architecture diagram
![image](https://user-images.githubusercontent.com/7858357/144570095-259fb0e0-75e7-4b8f-a68c-50ea0a77c5bf.png)

## UI Wireframe
![UI flow](https://user-images.githubusercontent.com/83194515/144699356-372da119-c8d1-4ec9-9ae9-f26a867e90d2.jpg)

## Class UML
![class diagram drawio](https://user-images.githubusercontent.com/83194515/144702829-fa3e3fe3-5c30-4128-bc58-bd72d4fb4a9f.png)

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

## Test Automation
Using Robot Framework and Selenium Library to perform automation test

### Requirement
Python 3.x

### Setup
`pip3 install -r requirement.txt`  

### Run test
`robot -V test/config/dev_config.py test/frontend/`

### Reporting
see sample report in *test/sample_report*  
![image](https://user-images.githubusercontent.com/7858357/144599101-cca0cff3-beb4-4cf2-b764-0f64902a85db.png)


## Deploy to AWS

### Setup Web Server (Node + Mongo + NGINX)
`curl https://gist.githubusercontent.com/cornflourblue/f0abd30f47d96d6ff127fe8a9e5bbd9f/raw/e3047c9dc3ce8b796e7354c92d2c47ce61981d2f/setup-nodejs-mongodb-production-server-on-ubuntu-1804.sh | sudo bash`


Setup user in mongo database
```
mongo

use team5-airline

db.createUser( { user: "root", pwd: "123456", roles: [{role: "readWrite", db: "team5-airline"}]})

```

### Clone repository to AWS server
`git clone git@github.com:gopinathsjsu/team-project-fall21-cmpe202-team5.git ~/team-project-fall21-cmpe202-team5`

### Start Back end server
`cd ~/team-project-fall21-cmpe202-team5/backend && sudo npm install`

`sudo pm2 start server.js`

### Start Front end server
`cd ~/team-project-fall21-cmpe202-team5/frontend && sudo npm install`

`sudo npm run build`

### Configure NGNIX to serve Back end and Front end
This is to create proxy to host both Front end and Back end services to port 80  
`sudo rm /etc/nginx/sites-available/default`

`sudo nano /etc/nginx/sites-available/default`

paste below code to the file  
```                                                                 
server {
  listen 80 default_server;
  server_name _;

  # react app & front-end files
  location / {
    root /home/ubuntu/team-project-fall21-cmpe202-team5/frontend/dist;
    try_files $uri /index.html;
  }

  # node api reverse proxy
  location /api/ {
    proxy_pass http://localhost:4000/;
  }
}
```

Restart NGNIX  
`sudo systemctl restart nginx`

## React-Redux-Startup

A simple startup application for production grade projects

The project has the following things incorporated

1. Express server running through webpack middleware
2. esling configured with some defult rules
3. babel-node setup to write full ES^ code in node
4. precommit hook setup to run custom script before any git commit
5. webpack plugins configured to create optimized and minimized production build
6. basic redux code setup
7. suppoort for jade to use server side rendering if required
8. dotevn setup, to set environment variables

____

+ Make sure to run `cp .env.example .env` command for the first time after you clone the repo

+ **`npm run start`** to run the server in development mode through webpack middleware.

  To access the server, navigate to `http://localhost:3001`

+ **`npm run build`** create a development build in `build` folder
`cd` to `build/` and the run command `node server` to run server in development mode
  
  To access the server, navigate to `http://localhost:3000`

+ **`npm run build:production`** create a production build in `build` folder
`cd` to `build/` and the run command `node server` to run server in production mode

  To access the server, navigate to `http://localhost:3000`

+ **`npm run lint:changed`** to run eslint against the last changes files

+ `precommmit` is configured to run `eslint` before any commits
  Make sure you fix all lint errors before commiting your code

# gene-devs-tests-app

## Local application launch

To run the application locally you need to install dependencies for
`backend` and `frontend` packages.

Installing packages is done only 1 time at the first start
of the project.

```
cd packages/backend
npm i
cd ../frontend
npm i
```

To launch application locally you can just use this command
from the root of app folder:

```
npm run start:dev
```

Or you can build the app and start the builded app:
```
npm run build
npm run start
```

To launch backend only you have to move to the backend package 
and run this command:

```
cd packages/backend
npm run start
```

To launch frontend only you have to move to the frontend package 
and run this command:

```
cd packages/frontend
yarn run start
```

## The main functionality of the application

This application was created to provide the user with creating tests
with convenient tools.

## Deploy

The app has been deployed on Render.com hosting.

Frontend app - https://gene-devs-front-app.onrender.com

Backend app  - https://gene-devs-back-app.onrender.com

## Structure

The application is divided into two parts: backend and frontend in
the packages folder.

## Backend

#### Technology stack
- NodeJS
- ExpressJS
- Typescript
- MongoDB
- Mongoose

#### Additional libraries and packages
- dotenv
- cors
- body-parser
- bcryptjs
- express-fileupload
- express-validator
- jsonwebtoken
- uuid

## Frontend

#### Technology stack
- NodeJS
- ReactJS
- Typescript
- React-Query
- MUI
- Styled Components

#### Additional libraries and packages
- axios
- formik
- react-router-dom
- react-toastify
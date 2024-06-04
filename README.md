# Task Master

A Personal Task Management System api

# features

- Profile Management
- Create task
- Update task
- Delete task
- Search and Filtering task

## how to set up and run the project locally?

To set up this project locally you need to clone this project.

```
git clone https://github.com/omarfaruktaj/task-master-backend.git task-master-backend

```

Then go to project directory

```
cd task-master-backend
```

Then you need to create .env file and add firebase configuration environment variables Like this:

```
PORT = 5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
MONGO_URI=your_database_uri

```

Then run

```
yarn install
```

to install require packages.

then run

```
yarn dev
```

The project will run locally.

To check health go to http://localhost:5000/health

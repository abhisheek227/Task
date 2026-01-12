# Task Manager - Backend

## Tech Stack
- Nodejs
- Mongodb

### Packages and dependency
- express 
- mongoose 
- bcryptjs
- Jasonwebtoken
- dotenv
- nodemon

## Apis

### Users and authentication routes

#### Register Route
<code>
POST /api/auth/register
</code>

- Thing we need to send is 
```json
{
    "name":"Abhishek",
    "email":"abhishek@yadav.com",
    "password":"Abhishek"
}
```
#### Login Route

<code>
POST /api/auth/login
</code>


```json
{
    "email":"abhisheek227@gmail.com",
    "password":"Abhishek"
}
```

#### Refresh token

<code>
Post /api/auth/refreshtoken
</code>

- This route is to refresh the access token 

### Task Routes
#### Create Task
<code>
POST /api/task/
</code> 

```json
{
    "title": "Test1",
    "description": "testing the route",
    "status": "pending",
    "priority": "low",
    "due_date":"2026-06-27"
}
```

#### update Task
<code>
PUT /api/task/:taskid
</code> 

```json
{
   "status": "in_progress"
}
```

#### Get task
<code>
GET /api/task/:id 
</code> 

#### Get all
<code>
GET /api/task/ 
</code> 

#### Delete task
<code>
Delete /api/task/:id
</code> 

## setup
### <code>.env</code> 
```js
PORT=5000
MONGO_URI=your database url
ACCESS_TOCKEN=Your access token key
ACCESS_TOCKEN_EXPIREY=1d
REFRESH_TOKEN_KEY=Your refresh token key
REFRESH_TOKEN_EXPIRY=25d
```


## Scripts
<code>npm start</code> - Start production server

<code>npm run dev</code> - Start development server with auto-reload
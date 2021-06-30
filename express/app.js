// this file sets up the server and responds to requests
const express = require('express');
const session = require('express-session');
const crypto = require('crypto')
// creates an Express application.
const app = express();

// creates a HTTP server object on our computer -
const http = require('http').createServer(app);
const cors = require('cors'); // disables cors

function getSessionKey(){
  var buffer = crypto.randomBytes(24);
  return buffer.toString('hex');
}

app.use(cors());
app.use(express.json()); // "everything on the server is returned as a JSON"
const PORT = 8000

// we make the http server listen on port 8000
http.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`)
})

// this will contain our routes from the express/routes folder.
const routes = {
	posts: require('./routes/posts'),
  users: require('./routes/users')
	// instruments: require('./routes/instruments'),
};


// ENDPOINTS
// open http://localhost:8000/posts to see the first one.
app.get('/posts',(req, res)=>{
  routes.posts.getAll()
  .then((posts)=> {
    res.json({posts: posts})
  });
})
app.get('/posts/:id',(req, res)=>{
  routes.posts.getById(req.params.id)
  .then((posts)=> {
    res.json({posts: posts})
  });
})
app.get('/users',(req, res)=>{
  routes.users.getAll()
  .then((users)=> {
    res.json({users: users})
  });
})
app.get('/users/:id',(req, res)=>{
  routes.users.getById(req.params.id)
  .then((users)=> {
    res.json({users: users})
  });
})

app.post('/login',(req,res)=>{

  // req.body is currently EMPTY - how did that happen?
  const email = req.body.email
  const password = req.body.password

  if (routes.users.verifyUserLogin(email,password) === true) {
    sessionKey = getSessionKey()
    // need to add sessionkey to db
    res.json({sessionKey: sessionKey})
  } else {
    res.json({message: 'no login for you! HERE 3'})
  }

})

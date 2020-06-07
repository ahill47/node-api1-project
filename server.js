const express = require ('express');
const db=require('./database.js');

//json requires body quotes


const server = express (); // creates the server
server.use(express.json())

server.get('/api/users', (req,res) => {
    const users=db.getUsers()
    res.json(users)
    if (users){
        res.json(users)
    }else{
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    }
    //handles request to the root of the api, the / route 
    //node server.js in terminal to run
});

server.get('/api/users/:id', (req,res) => {
    const user=db.getUserById(req.params.id)
        if (user){
            res.json(user)
        }else{
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        }
});

server.delete('/api/users/:id', (req,res) => {
    const user=db.getUserById(req.params.id)
    if (user){
        db.deleteUser(user.id)
        res.json(user.id)
        res.status(204).end()
    }else{
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
});

server.put('/api/users/:id', (req,res) => {
 const user=db.getUserById(req.params.id)
 if (user){
     const updatedUser=db.updateUser(user.id, {
         name:req.body.name || user.name,
         bio:req.body.bio || user.bio
     });
     res.status(200).json(updatedUser)
 }else{
     res.status(500).json({ errorMessage: "The user information could not be modified." })
 }
 
});


server.post('/api/users' , (req, res) => {
    if (!req.body.bio){
        return res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
    
    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    })
    res.status(201).json(newUser)
})

// watch for connection on port 5000
server.listen(1000, () =>
console.log('Server running on http://localhost:1000')
);
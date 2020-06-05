const express = require ('express');
const db=require('./database.js');


const server = express ();
server.use(express.json())

server.get('/users', (req, res)=>{

})



server.listen(5000, () =>
console.log('Server running on http://localhost:500')
);
var express = require('express')
var bodyParser = require('body-parser')

var Database = require('./models/Database').Database
var IP = require('./utils/utils').ip

var StreamingServer = require('./streaming/server')

//connect to the database :

var db = new Database("double-helix_dev").connect()

//express init

var app = express()
app.use(bodyParser.json())


//main ping route:
app.post('/api/ping', (req, resp) => {
    //check is json-serialization is working
    console.log(req.body)
    
    resp.send({success : true, pingData : req.body})
})

/*

  ----- Route usage -----

*/

var admin = require('./routes/admin')
app.use('/admin', admin)

var user = require('./routes/user')
app.use('/user', user)

app.listen(7880, IP(), () => {
    new StreamingServer(10000).run() 
    console.log("Started server @ http://"+ IP() + ':7666')
    //starting a demo server  
})
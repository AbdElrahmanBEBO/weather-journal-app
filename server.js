projectData = {};

const express = require('express');
const app = express();
app.use(express.static('website'));


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());


const port = 8000;
const server = app.listen(port , ()=>{console.log(`server is running localhost:${port}`)});


app.post('/all',(req, res) => {
    projectData["date"] = `${req.body.date}`;
    projectData["temp"] = `${req.body.temp}`;
    projectData["feelings"] = `${req.body.feelings}`;
    console.log(projectData);
    res.send(projectData);
});

app.get('/all',(request,response) => {
    response.send(projectData);
});

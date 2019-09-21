var path = require('path');

// Exporting to use back on server.js
// Pass in app variable to get app = express() from server.js
module.exports = function(app){
    // Add routes for html loading
    // Homepage
    app.get("/",function(req,res){
        res.sendFile(path.join(__dirname,"../public/home.html"));
    });
    // Survey
    app.get("/survery",function(req,res){
        res.sendFile(path.join(__dirname,"/../public/survey.html"));
    });
}
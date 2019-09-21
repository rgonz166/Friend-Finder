var users = require('../data/friends.js');

// Exporting to use back on server.js
// Pass in app variable to get app = express() from server.js
module.exports = function(app){
    // Routing
    app.get('/api/friends',function(req,res){
        // Display friends object
        res.json(users);
    });
    // Convert the scores to Integers for comparison
    app.post('/api/friends',function(req,res){
        var newUser = req.body;
        // Loop through the array of choices from survey
        for(var i=0;i<newUser.scores.length;i++){
            newUser.scores[i] = parseInt(newUser.scores[i])
        }
    
        // Compare users for compatibility
        var comparison = [];
        for(var i=0;i<users.length;i++){
            // Current selected user to compare
            var currentUser = users[i];
            // Total difference between current user and new user
            var total = 0;
            // Inner loop to compare the values
            for(var j=0;j<currentUser.scores.length;j++){
                // add the absolute value of the difference of each answer
                total += Math.abs(currentUser.scores[j] - newUser.scores[j]);
            }
            comparison.push(total);
        }

        var bestFriend = comparison[0];
        var index = 0;
        for(var i=1; i<comparison.length;i++){
            // some optimization
            if(comparison[i]===0){
                index = i;
                break;
            }
            else if(bestFriend > comparison[i]){
                bestFriend = comparison[i];
                index = i;
            }
        }
        // Add new user to array
        // Added after checking everything or else you would get the same person as best friend
        users.push(newUser);
        res.json(users[index]);
    });
}
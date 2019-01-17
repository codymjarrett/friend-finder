const path = require('path');
const friends = require('../data/friends')
const arraySort = require('array-sort');
 
// // holds current user's scores 
// let newFriendScores = [];
// let everyoneElsesScore = [];

module.exports = function (app) {
    // root level
    app.get('/api/friends', (req, res) => {
        res.json(friends)
    });

    app.post('/api/friends', (req, res) => {
        // captures current users scores
        let userCurrentData = req.body;
        let bestMatch;
        let results = 0;
        for (let i = 0; i < friends.length; i++) {
            results = 0;
            const currentFriend = friends[i];
            for (let j = 0; j < currentFriend.scores.length; j++) {
                results += Math.abs(userCurrentData.scores[j] - currentFriend.scores[j]);
            }
            if(!bestMatch || bestMatch.compatScore > results) {
                bestMatch = currentFriend;
                bestMatch.compatScore = results;
            }

        };

      
        return res.json(bestMatch);
        
    })

    app.get('/survey', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/survey.html"))
    })
}
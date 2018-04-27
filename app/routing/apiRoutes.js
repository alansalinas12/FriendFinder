export default function apiRoutes(app) {
    const fs = require("fs");
    const path = require("path");
    let friends = require("./../data/friends.json");
    app.get("/api/friends", (req, res) => {
        return fs.readFile(path.join(__dirname, '../data/friends.json'), 'utf8', (err, data) => {
            if (err)
                throw err;
            var friendList = JSON.parse(data);
            res.json(friendList);
        });
    });
    app.post("/api/friends", (req, res) => {
        var compatibility;
        var compatibilityTester = [];
        var newFriend = req.body;
        for (var i = 0; i < friends.length; i++) {
            compatibility = 0;
            for (var j = 0; j < newFriend.scores.length; j++) {
                compatibility += Math.abs(friends[i].scores[j] - newFriend.scores[j]);
            }
            compatibilityTester.push(compatibility);
        }
        var match = compatibilityTester.indexOf(Math.min(...compatibilityTester));
        res.json(friends[match]);
        fs.readFile(path.join(__dirname, '../data/friends.json'), 'utf8', (err, data) => {
            if (err)
                throw err;
            friends = JSON.parse(data);
            friends.push(newFriend);
            fs.writeFile(path.join(__dirname, '../data/friends.json'), JSON.stringify(friends, null, 2), (err) => {
                if (err)
                    throw err;
            });
        });
    });
}
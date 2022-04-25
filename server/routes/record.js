const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
const users = require('../db/users');
const messages = require('../db/messages');
const { default: mongoose } = require("mongoose");

//53-bit hash function courtesy of bryc on stackoverflow: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

recordRoutes.route("/login").post(function (req, res) {
    const { username, password } = req.body;
    users.findOne({ username: username, password: password }, function (err, result) {
        if (err) console.log(err);
        if (result == null) {
            res.send({ "token": null });
        } else {
            res.send({ "token": cyrb53(username, 5) });
        }
    });
})


recordRoutes.route("/register").post(function (req, res) {
    const { username, password } = req.body;
    users.findOne({ username: username }, function (err, result) {
        if (result != null) {
            res.send({ "Condition": "COLLISION" });
        } else {
            let newUser = new users({ id: cyrb53(username), username: username, password: password });
            if (username.length < 4 || password.length < 4 || username.length > 20 || password.length > 50) {
                res.send({ "Condition": "INVALID" })
            } else {
                newUser.save(function (err, obj) {
                    if (err) console.log(err);
                    else res.send({ "Condition": "SUCCESS" });
                })
            }
        }
    });
})
module.exports = recordRoutes;
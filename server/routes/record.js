const express = require("express");
const app = require('../server');
var expressWs = require('express-ws')(app);
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
const users = require('../db/users');
const messages = require('../db/messages');
const server = require('../db/ChatServer');
const { default: mongoose } = require("mongoose");
const serverMap = new Map();
const usersMap = new Map();
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
// Make it so that adding a user adds {user.token, ws instance}
const addUserToServer = function (server, user) {
    if (!serverMap.has(server)) {
        serverMap.set(server, [user.token])
    } else {
        var users = serverMap.get(server)
        console.log(user);
        if (!users.includes(user.token)) {
            users.push(user.token)
            serverMap.set(server, users)
        }
    }
}

const removeUserFromServer = function (server, user) {
    if (!serverMap.has(server) || !serverMap.get(server).includes(user)) {
        return;
    } else {
        userArr = serverMap.get(server)
        serverMap.set(server, userArr.splice(userArr.indexOf(user), 1))
        if (userArr.length == 0) {
            serverMap.delete(server)
        }
    }
}

recordRoutes.route("/login").post(function (req, res) {
    const { username, password } = req.body;
    users.findOne({ username: username, password: password }, function (err, result) {
        if (err) console.log(err);
        if (result == null) {
            res.send({ "token": 0 });
        } else {
            const token = cyrb53(username + Date.now());
            result.authid = token;
            result.save();
            res.send({ "token": token });
        }
    });
})


recordRoutes.route("/register").post(function (req, res) {
    const { username, password } = req.body;
    users.findOne({ username: username }, function (err, result) {
        if (result != null) {
            res.send({ "Condition": "COLLISION" });
        } else {
            let newUser = new users({ _id: new mongoose.Types.ObjectId(), id: cyrb53(username), authid: 0, username: username, password: password, servers: [] });
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

recordRoutes.route("/getuserservers").post(function (req, res) {
    const { token } = req.body;
    users.findOne({ authid: token }).populate('servers').exec(function (err, user) {
        if (err || !user) res.send({ "CONDITION": "FAILURE" });
        else {
            res.send({ "CONDITION": "SUCCESS", "SERVERS": user.servers });
        }
    })
})

recordRoutes.route("/createserver").post(function (req, res) {
    const { token, serverName } = req.body
    users.findOne({ authid: token }, function (err, result) {
        if (err || !result || !serverName || serverName.length < 1) {
            res.send({ "CONDITION": token });
        }
        else {
            let serverId = cyrb53(((Date.now() * 2097151).toString()), 1);
            let newServer = new server({ _id: new mongoose.Types.ObjectId(), id: serverId, src: 'discord-pfp.png', name: serverName, messages: [] });
            newServer.users.push(result);
            newServer.save(function (e, r) {
                result.servers.push(newServer);
                result.save();
            });
            res.send({ "Condition": "SUCCESS", "id": newServer });
        }
    })
})

recordRoutes.route("/getmessages").post(function (req, res) {
    const { serverId } = req.body;
    server.findOne({ id: serverId }, function (err, result) {
        if (err || !result) {
            res.send({ "CONDITION": "FAILURE" });
        } else {
            res.send({ "CONDITION": "SUCCESS" });
        }
    });
})

recordRoutes.route("/addmessage").post(function (req, res) {

})
recordRoutes.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        const data = JSON.parse(msg);
        switch (data.op) {
            case 0:
                //User joins the chat, initalize them 
                console.log('joined')
                addUserToServer(data.server, data.token);
                let tempArr = new Array();
                tempArr[0] = ws
                tempArr[1] = data.server
                usersMap.set(data.token.token, tempArr);
                break;
            case 1:
                //User changes channel
                removeUserFromServer(data.oldServer, data.token);
                addUserToServer(data.newServer, data.token);
                let newtempArr = new Array();
                newtempArr[0] = ws
                newtempArr[1] = data.newServer
                usersMap.set(data.token.token, newtempArr)
                break;
            case 2:
                //remove user on disconnect
                removeUserFromServer(usersMap.get(data.token.token)[1], data.token)
                usersMap.delete(data.token.token)
                break;
            case 3:
                //Add a message
                users.findOne({ authid: data.token.token }, function (err, res) {
                    if (err || !res) {
                        ws.send('error')
                    } else {
                        const obj = { time: Date.now(), src: 'discord-pfp.png', body: data.body, name: data.name }
                        usersToEmit = serverMap.get(usersMap.get(data.token.token)[1])
                        for (const user of usersToEmit) {
                            if (user != data.token.token) {
                                usersMap.get(user)[0].send(JSON.stringify(obj))
                            }
                        }
                        let newMessage = new messages({ id: cyrb53(((Date.now() * 2097151).toString()), 1), body: data.body, author: res })
                        newMessage.save(function (e, r) {
                            const userServer = usersMap.get(data.token.token)[1]
                            server.findOne({ id: userServer }, function (err, result) {
                                if (err || !result) {
                                    console.log('error finding server')
                                } else {
                                    result.messages.push(newMessage);
                                    result.save();
                                }
                            })
                        })
                    }
                })
                break;
            case 9:
                ws.send(data.heartbeat)
                break;
            default:
                break;
        }
    });

});

module.exports = recordRoutes;
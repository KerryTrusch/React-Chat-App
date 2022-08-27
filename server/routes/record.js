const express = require("express");
const app = require('../server');
var expressWs = require('express-ws')(app);
require("dotenv").config({ path: "./config.env" });
const JWT_KEY = process.env.PRIVATE_KEY;
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
const serverMap = new Map();
const usersMap = new Map();
const mysql = require('mysql2');
const argon2 = require('argon2');
var jwt = require('jsonwebtoken');
const connection = mysql.createPool({
    host: '73.43.191.158',
    port: 3306,
    user: 'sammy',
    password: 'password',
    database: 'ml_app'
});

// Make it so that adding a user adds {user.token, ws instance}
const addUserToServerMap = function (server, user) {
    if (!serverMap.has(server)) {
        let userArr = [user];
        serverMap.set(server, userArr)
    } else {
        let users = serverMap.get(server)
        if (!users.includes(user)) {
            users.push(user)
            serverMap.set(server, users)
        }
    }
}

const removeUserFromServerMap = function (server, user) {
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

const findUser = async (username) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'SELECT * FROM `users` WHERE `uname` = ?',
            [username]
        );
    return row;
}

const findUserByID = async (id) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'SELECT * FROM `users` WHERE `id` = ?',
            [id]
        );
    return row;
}

const createServer = async (snowflake, name) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'INSERT INTO `server` (`serverID`, `name`) VALUES (?, ?)',
            [snowflake, name]
        );
}

const findServerInfoByID = async (snowflake) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'SELECT * FROM `server` WHERE `serverID` = ?',
            [snowflake]
        );
    return row;
}

const findUsersServers = async (id) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'SELECT * FROM `server` WHERE `serverID` IN (SELECT `serverID` FROM `users_in_server` WHERE ? = `userID`)',
            [id]
        );
    return row;
}

const findUsersInServer = async (snowflake) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'SELECT * FROM `users` WHERE `id` IN (SELECT `userID` FROM `users_in_server` WHERE ? = `serverID`)',
            [snowflake]
        );
    return row;
}

const findAllMessagesInChannel = async (snowflake) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'SELECT * FROM `server_messages` WHERE `channel_id` = ?',
            [snowflake]
        );
    return row;
}

const findChannelsByServerID = async (snowflake) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'SELECT * FROM `channel` WHERE `serverID` = ? ORDER BY `pos_order` asc',
            [snowflake]
        );
    return row;
}

const createChannel = async (channelSnowflake, serverSnowflake, name, order) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'INSERT INTO channel (`channelID`, `serverID`, `name`, `pos_order`) VALUES (?, ?, ?, ?)',
            [channelSnowflake, serverSnowflake, name, order]
        );
}

const addUserToServer = async (id, serverSnowflake) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'INSERT INTO `users_in_server` (`userID`, `serverID`) VALUES (?, ?)',
            [id, serverSnowflake]
        );
}

const addMessageToChannel = async (channelID, message, serverID, timestamp, src, userID, name) => {
    const promisePool = connection.promise();
    const [row, fields] = await
        promisePool.execute(
            'INSERT INTO `server_messages` (`channel_id`, `message`, `serverID`, `timestamp`, `src`, `userID`, `name`) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [channelID, message, serverID, timestamp, src, userID, name]
        );
}

recordRoutes.route("/login").post(async (req, res) => {
    const { username, password } = req.body;
    const user = await findUser(username);
    const info = user[0];
    if (user.length > 0) {
        try {
            // Correct username, password correctly verified
            if (await argon2.verify(info.pword, password)) {
                const token = jwt.sign({ id: info.id }, JWT_KEY);
                res.send({ token: token });
                // Correct username, password incorrect
            } else {
                res.sendStatus(401);
            }
            // Random error
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
        // Incorrect username/user does not exist
    } else {
        res.status(404).send('Not found');
    }
})


recordRoutes.route("/register").post(async (req, res) => {
    const { username, password } = req.body;
    const user = await findUser(username);
    if (user.hasOwnProperty('id')) {
        res.sendStatus(404);
    } else {
        try {
            const hash = await argon2.hash(password);
            connection.execute(
                'INSERT INTO `users` (`uname`, `pword`) VALUES (?, ?)',
                [username, hash],
                function (err, results, fields) {
                    res.status(200).send('Account successfully created');
                }
            )
        } catch (err) {
            console.log(err);
            res.sendStatus(400);
        }
    }
})

recordRoutes.route("/getservers").post(async (req, res) => {
    const { token } = req.body;
    if (token != undefined) {
        const decoded = jwt.verify(token, JWT_KEY);
        const id = decoded.id;
        const servers = await findUsersServers(id);
        res.status(200).send(servers);
    }
})

recordRoutes.route("/getchannels").post(async (req, res) => {
    const { serverID } = req.body;
    if (serverID != undefined) {
        const channels = await findChannelsByServerID(serverID);
        res.status(200).send(channels);
    }
})

recordRoutes.route("/getusers").post(async (req, res) => {
    const { serverID } = req.body;
    const users = await findUsersInServer(serverID);
    res.status(200).send(users);
})

recordRoutes.route("/createserver").post(async (req, res) => {
    const { token, serverName } = req.body;
    const decoded = jwt.verify(token, JWT_KEY);
    const id = decoded.id;
    const serverSnowflake = Date.now().toString(36);
    createServer(serverSnowflake, serverName);
    const channelSnowflake = (Date.now() + 1).toString(36);
    createChannel(channelSnowflake, serverSnowflake, "general", 0);
    addUserToServer(id, serverSnowflake);
    res.sendStatus(200);
})

recordRoutes.route("/createchannel").post(async (req, res) => {
    const { serverID, channelName, pos } = req.body;
    const channelSnowflake = Date.now().toString(36);
    createChannel(channelSnowflake, serverID, channelName, pos);
    res.sendStatus(200);
})

recordRoutes.route("/joinserver").post(async (req, res) => {
    const { token, serverID } = req.body;
    const decoded = jwt.verify(token, JWT_KEY);
    const id = decoded.id;
    addUserToServer(id, serverID);
    res.sendStatus(200);
})


recordRoutes.route("/getmessages").post(async (req, res) => {
    const { channelID } = req.body;
    if (channelID != undefined) {
        const messages = await findAllMessagesInChannel(channelID);
        res.status(200).send(messages);
    }
})

recordRoutes.route("/addmessage").post(function (req, res) {
    const { src, message, timestamp, name, token, serverID, channelID } = req.body;
    if (token != undefined) {
        const decoded = jwt.verify(token, JWT_KEY);
        const userID = decoded.id;
        addMessageToChannel(channelID, message, serverID, timestamp, src, userID, name);
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

recordRoutes.route("/getserverinfo").post(async (req, res) => {
    const { serverID } = req.body;
    const info = await findServerInfoByID(serverID);
    res.status(200).send(info[0]);
});

recordRoutes.ws('/', function (ws, req) {
    ws.on('message', function (msg) {
        const data = JSON.parse(msg);
        switch (data.op) {
            case 0:
                const userMapList = new Array();
                userMapList[0] = ws; userMapList[1] = null;
                usersMap.set(data.token, userMapList);
                break;
            case 1:
                if (usersMap.get(data.token)[1] != null) {
                    removeUserFromServerMap(usersMap.get(data.token)[1], data.token);
                }
                addUserToServerMap(data.newServer, data.token);
                break;
            case 2:
                //remove user on disconnect
                removeUserFromServerMap(usersMap.get(data.token)[1], data.token);
                usersMap.delete(data.token);
                break;
            case 3:
                //send message
                const userArr = serverMap.get(data.channelID);
                for (const user of userArr) {
                    console.log(user + " : " + data.msgdata.token);
                    if (user != data.msgdata.token) {
                        usersMap.get(user)[0].send(JSON.stringify({ op: 3, message: data.msgdata }));
                    }
                }
                break;
            case 9:
                ws.send(data.heartbeat)
                break;

        }
    });

});

module.exports = recordRoutes;

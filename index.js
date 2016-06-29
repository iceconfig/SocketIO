/**
 * Created by ZHL on 2016/6/27.
 */
var app = require('./app');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var redis = require('redis').createClient;
var adapter = require('socket.io-redis');
var pub = redis(6379, '192.168.8.38', { auth_pass: "redispassword" });
var sub = redis(6379, '192.168.8.38', { return_buffers: true, auth_pass: "redispassword" });
io.adapter(adapter({ pubClient: pub, subClient: sub }));

io.on('connection', function (socket) {
    console.log('new user connection:' + socket.id);
    socket.emit('chat message', 'welcome ' + socket.id);
    io.emit('chat message', socket.id + ' join the room');
    socket.on('chat message', function (msg) {
        console.log('get message from ' + socket.id + ':' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
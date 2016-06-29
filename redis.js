/**
 * Created by ZHL on 2016/6/28.
 */
var redis = require('redis');
var client = redis.createClient(6379,'192.168.8.38');
client.auth('redispassword');
client.on('error',function(error){
    console.log(error);
});

module.exports = client;
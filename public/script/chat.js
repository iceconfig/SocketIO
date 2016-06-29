/**
 * Created by ZHL on 2016/6/28.
 */
var socket = io();
$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg){
    console.info(socket);
    $('#messages').append($('<li>').text(msg));
});
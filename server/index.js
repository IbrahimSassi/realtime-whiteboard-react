const io = require('socket.io')();
const port = 8000;
const r = require('rethinkdb');


r.connect({
    host: 'localhost',
    port: 28015,
    db: 'awesome_whiteboard'
}).then((connection) => {


    io.on('connection', (client) => {
        client.on('subscribeToTimer', (interval) => {
            console.log("client is subscribing to timer with ", interval);
            r.table('timers')
                .changes()
                .run(connection)
                .then((cursor) => {
                    cursor.each((err, timerRow) => {
                        console.log(timerRow);
                        client.emit('timer', timerRow.new_val.timestamp);
                    })
                })
        })
    })


})


io.listen(8000);

console.log("listening on port", port)
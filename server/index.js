const io = require('socket.io')();
const port = 8000;


io.on('connection', (client) => {
    client.on('subscribeToTimer', (interval) => {
        console.log("client is subscribing to timer with ", interval);
        setInterval(() => {
            client.emit('timer', new Date());
        }, interval)
    })
})

io.listen(8000);

console.log("listening on port", port)
const io = require('socket.io')();
const r = require('rethinkdb');

function createdDrawing({connection, name}) {
    r.table('drawings')
        .insert({
            name,
            timestamp: new Date()
        })
        .run(connection)
        .then(() => {
            console.log('created a drawing ', name);
        })
}


function subscribeToDrawings({client, connection}) {
    r.table('drawings')
        .changes({include_initial: true})
        .run(connection)
        .then((cursor) => {
            cursor.each((err, drawingRow) => client.emit('drawing', drawingRow.new_val))
        })
}


function handleLinePublish({connection, line}) {
    // console.log('save line to the db')
    r.table('lines')
        .insert(Object.assign(line, {timestamp: new Date()}))
        .run(connection);
}


function subscribeToDrawingLine({client, connection, drawingId, from}) {

    let query = r.row('drawingId').eq(drawingId);
    if (from) {
        query = query.and(
            r.row('timestamp').ge(new Date(from))
        );
    }
    return r.table('lines')
        .filter(query)
        .changes({include_initial: true})
        .run(connection)
        .then((cursor) => {
            cursor.each((err, lineRow) => {
                client.emit(`drawingLine:${drawingId}`, lineRow.new_val)
            })
        })
}


r.connect({
    host: 'localhost',
    port: 28015,
    db: 'awesome_whiteboard'
}).then((connection) => {


    io.on('connection', (client) => {
        client.on('createDrawing', ({name}) => {
            createdDrawing({connection, name});
        })

        client.on('subscribeToDrawings', () => subscribeToDrawings({client, connection}));


        client.on('publishLine', (line) => {
            // console.log(line)
            handleLinePublish({line, connection})
        })


        client.on('subscribeToDrawingLines', ({drawingId, from}) => {
            subscribeToDrawingLine({client, connection, drawingId, from});
        })

    })


})


const port = parseInt(process.argv[2], 10) || 8000
io.listen(port);

console.log("listening on port", port)
import openSocket from 'socket.io-client';

const socket = openSocket.connect('http://localhost:8000');


function subscribeToDrawings(cb) {
    socket.on('drawing', cb);

    socket.emit('subscribeToDrawings');

}


function createdDrawing(name) {
    socket.emit('createDrawing', {name})
}


function publishLine({drawingId, line}) {
    socket.emit('publishLine', {drawingId, ...line})
}


function subscribeToDrawingLines(drawingId, cb) {
    socket.on(`drawingLine:${drawingId}`, cb)
    socket.emit('subscribeToDrawingLines', drawingId)
}

export {
    subscribeToDrawings,
    createdDrawing,
    publishLine,
    subscribeToDrawingLines
};
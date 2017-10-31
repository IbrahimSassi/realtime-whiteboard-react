import openSocket from 'socket.io-client';
import Rx from 'rxjs/Rx'


const port = parseInt(window.location.search.replace('?', ''), 10) || 8000
const socket = openSocket.connect(`http://localhost:${port}`);


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

    const lineStream = Rx.Observable.fromEventPattern(
        h => socket.on(`drawingLine:${drawingId}`, h),
        h => socket.off(`drawingLine:${drawingId}`, h),
    )

    const bufferedStream = lineStream
        .bufferTime(100)
        .map(lines => ({lines}));

    bufferedStream.subscribe(linesEvent => cb(linesEvent));

    // socket.on(`drawingLine:${drawingId}`, line => cb(line))
    socket.emit('subscribeToDrawingLines', drawingId)
}


function subscribeToConnectionEvent(cb) {
    socket.on('connect', () => cb({
        state: 'connected',
        port
    }))
    socket.on('disconnect', () => cb({
        state: 'disconnected',
        port
    }))
    socket.on('connect_error', () => cb({
        state: 'disconnected',
        port
    }))
}

export {
    subscribeToDrawings,
    createdDrawing,
    publishLine,
    subscribeToDrawingLines,
    subscribeToConnectionEvent
};
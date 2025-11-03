import { io } from 'socket.io-client';
let socket = null;
export function getSocket() {
    if (!socket) {
        socket = io('https://codelang.vercel.app', {
            withCredentials: true,
            transports: ['websocket'],
        });
    }
    return socket;
}
export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}

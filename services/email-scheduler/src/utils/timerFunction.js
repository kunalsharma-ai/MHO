export default function timerFunction(duration, callback) {
    setInterval(() => {
        callback();
    }, duration)
}
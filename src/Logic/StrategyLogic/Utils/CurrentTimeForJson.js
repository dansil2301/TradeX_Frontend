export function getCurrentTimeInISOFormat() {
    let now = new Date();
    let year = now.getUTCFullYear();
    let month = ('0' + (now.getUTCMonth() + 1)).slice(-2);
    let day = ('0' + now.getUTCDate()).slice(-2);
    let hours = ('0' + now.getUTCHours()).slice(-2);
    let minutes = ('0' + now.getUTCMinutes()).slice(-2);
    let seconds = ('0' + now.getUTCSeconds()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}
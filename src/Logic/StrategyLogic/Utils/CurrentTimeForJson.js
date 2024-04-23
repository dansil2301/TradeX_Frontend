export function dateConverter(date) {
    let year = date.getUTCFullYear();
    let month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    let day = ('0' + date.getUTCDate()).slice(-2);
    let hours = ('0' + date.getUTCHours()).slice(-2);
    let minutes = ('0' + date.getUTCMinutes()).slice(-2);
    let seconds = ('0' + date.getUTCSeconds()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export function getCurrentTimeInISOFormat() {
    let now = new Date();
    return dateConverter(now);
}

export function getTimeInISOFormat(time) {
    let date = new Date(time);
    return dateConverter(date);
}
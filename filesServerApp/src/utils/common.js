export const getFormattedDate = (unixTimeStamp) => {
    if(!unixTimeStamp) return "-"

    let date = new Date(unixTimeStamp * 1000);
    return date.toLocaleString()
}

export const getFormattedTimeTaken = (unixTimeStamp) => {
    if(!unixTimeStamp) return "-"

    var date = new Date(unixTimeStamp * 1000);
    var hours = "0" + date.getUTCHours();
    var minutes = "0" + date.getUTCMinutes();
    var seconds = "0" + date.getUTCSeconds();
    return `${hours.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(-2)}`
}
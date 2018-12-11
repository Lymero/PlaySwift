function toReadable(uglyDate) {
    let date = new Date(uglyDate);
    return date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
}

export default {toReadable: toReadable};
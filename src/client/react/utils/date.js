function toReadable(uglyDate) {
  let date = Date(uglyDate);
  let splitedDate = date.split(" ");
  return splitedDate[2] + " " + splitedDate[1] + " " + splitedDate[3];
}

export default { toReadable: toReadable };

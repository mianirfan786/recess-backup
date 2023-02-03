const getDate = (date) =>
  `${date.toLocaleString("en-US", {
    weekday: "long",
  })}, ${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getDay()}`;

export default getDate;

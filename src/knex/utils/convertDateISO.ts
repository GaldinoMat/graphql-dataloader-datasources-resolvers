export const createDate = (dateISO: string) => {
  let date;
  if (!dateISO) {
    date = new Date();
  } else {
    date = new Date(dateISO);
  }

  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium"
  })
}

export const dateISOtoMySQL = (dateISO: string) => {
  const rawDate = createDate(dateISO);
  const [date, time] = rawDate.split(" ")
  const [day, month, year] = date.split("/")

  return `${year}-${month}-${day} ${time}`
}

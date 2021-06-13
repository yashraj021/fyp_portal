export const getPrintableDate = (dateString) => {
  const date = new Date(Number(dateString));
  return date.toLocaleString();
}

export const getPrintableDate = (dateString) => {
  const primitive = Date(dateString);
  const date = new Date(primitive);
  return date.toLocaleString();
}

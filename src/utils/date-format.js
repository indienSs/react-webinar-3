/**
 * Форматирование даты под "ру" локаль
 */
export default function dateFormat(date) {

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
  };
    
  const formatedDate = new Date(date).toLocaleString("ru", options).replace(/\s*г\.,/, " в");

  return formatedDate;
}
export async function getDateTimeActual() {
  const currentDate = new Date();

const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Os meses são baseados em zero, então adicione 1
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

const formattedDateTime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return formattedDateTime;
}

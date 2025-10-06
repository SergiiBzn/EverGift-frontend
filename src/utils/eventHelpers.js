import { setYear, isBefore, startOfDay } from "date-fns";
/*
 * dependent on the repeat setting
 * @param {Object} event - The event object to check for repeat settings
 * @returns {Date} - The next valid date
 */
export function getNextEventDate(event, today = new Date()) {
  if (!event || !event.date) {
    return null;
  }
  const eventDate = new Date(event.date);
  if (isNaN(eventDate.getTime())) {
    return null;
  }
  if (event.isRepeat === "yearly") {
    // set year to current year
    let nextDate = setYear(eventDate, today.getFullYear());

    if (isBefore(nextDate, startOfDay(today))) {
      nextDate = setYear(nextDate, today.getFullYear() + 1);
    }

    return nextDate;
  }
  return eventDate;
}

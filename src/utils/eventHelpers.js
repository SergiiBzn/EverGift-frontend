import { setYear, isBefore } from "date-fns";
/*
 * dependent on the repeat setting
 * @param {Object} event - The event object to check for repeat settings
 * @returns {Date} - The next valid date
 */
export function getNextEventDate(event, today = new Date()) {
  const eventDate = new Date(event.date);
  if (event.isRepeat === "yearly") {
    // set year to current year
    let nextDate = setYear(eventDate, today.getFullYear());

    if (isBefore(nextDate, today)) {
      nextDate.setFullYear(today.getFullYear() + 1);
    }
    return nextDate;
  }
  return eventDate;
}

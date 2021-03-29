import startOfDay from "date-fns/startOfDay";
import startOfMinute from "date-fns/startOfMinute";

/**
 * Changed model into oString.
 * However it will only be accepting Date Formats. The formatDate function should be used on any kind of
 * push into the db. This will fix the rehydration not accepting Date types. New process for changing date rows:
 * 1 - get Date formatted String
 * 2 - convert back into Date Object
 * 3 - Make manipulations
 * 4 - Convert back into Date formatted String
 * 5 - Push back into Db
 */

/**
 * @param d The Date Object
 * @param includeTime Optional Boolean that removes seconds
 * @returns String
 */
export function convertDateToString(d: Date, includeTime?: Boolean): string {
    if (includeTime) {
        const cleanTime = startOfMinute(d);
        const toString = cleanTime.toDateString();
        return toString;
    }
    const removeTime = startOfDay(d);
    const toString = removeTime.toDateString();
    return toString;
}

/**
 * @param s Date String
 * @returns Date Object
 */
export function convertStringToDate(s: string) {
    const toDate = new Date(s);
    return toDate;
}

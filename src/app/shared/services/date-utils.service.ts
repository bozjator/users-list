export class DateUtils {
  /**
   * Adds given minutes to given date. If date is omited it will create new one.
   *
   * @param minutes Minutes to add.
   * @param date Optional date to which minutes will be added.
   * @returns Date with minutes added.
   */
  static addMinutesToDate(minutes: number, date: Date = new Date()): Date {
    const minutesAsMilis = minutes * 60 * 1000;
    return new Date(date.getTime() + minutesAsMilis);
  }
}

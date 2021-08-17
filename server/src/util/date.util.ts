export class DateUtil {
  static getFirstDayOfYear = (year: number) => new Date(year, 0, 1);

  static getLastDayOfYear = (year: number) => new Date(year, 11, 31);
}

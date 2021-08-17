export class DateUtil {
  static getFirstDayOfYear = (year: number) => new Date(year, 0, 1);

  static getLastDayOfYear = (year: number) => new Date(year, 11, 31);

  static getAllMonths = () =>
    Array.from({ length: 12 }, (_, index) => index + 1);
}

export class DateUtil {
  static getFirstDateOfYear = (year: number) => new Date(year, 0, 1);

  static getLastDateOfYear = (year: number) => new Date(year, 11, 31);

  static getFirstDateOfMonth = (year: number, month: number) =>
    new Date(year, month - 1);

  static getLastDateOfMonth = (year: number, month: number) =>
    new Date(year, month, 0);

  static getAllMonths = () =>
    Array.from({ length: 12 }, (_, index) => index + 1);
}

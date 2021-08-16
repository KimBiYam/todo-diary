export class CommonUtil {
  static isDataExists = (value: unknown) => {
    if (value === null || value === undefined) {
      return false;
    }

    return true;
  };
}

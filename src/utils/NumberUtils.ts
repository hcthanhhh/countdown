export default class NumberUtils {
  static convertToPercentage(decimalNumber: number): number {
    const percentage = (decimalNumber * 100).toFixed(2);
    return +percentage;
  }

  static roundPercentage(num: number) {
    const rounded = Math.round(num * 100);
    return rounded;
  }

  static numberToCurrency(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

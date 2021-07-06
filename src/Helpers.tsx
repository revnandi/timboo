export function addZeroToSingleDigits(num: number) {
  return num.toString().padStart(2, '0');
}
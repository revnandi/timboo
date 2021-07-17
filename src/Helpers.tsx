export function addZeroToSingleDigits(num: number) {
  return num.toString().padStart(2, '0');
}

export function createMarkup(markup: string) {
  return { __html: markup };
}
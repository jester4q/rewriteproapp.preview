export function padLeft(v: number, n: number, str: string = "0"): string {
  return (
    (v < 0 ? "-" : "") +
    Array(n - String(Math.abs(v)).length + 1).join(str || "0") +
    Math.abs(v)
  );
}

function formatDate(date: Date) {
  // Data about date
  const format = {
    dd: padLeft(date.getDate(), 2),
    mm: padLeft(date.getMonth() + 1, 2),
    yyyy: date.getFullYear(),
  };

  return format;
}

function formatTime(date: Date) {
  // Data about date
  const format = {
    hh: padLeft(date.getHours(), 2),
    mm: padLeft(date.getMinutes(), 2),
    ss: padLeft(date.getSeconds(), 2),
  };

  return format;
}

export function dateToStr(date: Date) {
  const { dd, mm, yyyy } = formatDate(date);
  return `${yyyy}-${mm}-${dd}`;
}

export function dateTimeToStr(date: Date) {
  const { dd, mm, yyyy } = formatDate(date);
  const { hh: HH, mm: MM, ss: SS } = formatTime(date);
  return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`;
}

export function isNumber(val: any): boolean {
  return (
    val !== undefined &&
    val != null &&
    val !== "" &&
    !isNaN(Number(val.toString()))
  );
}

export function isString(val: any): boolean {
  return val !== undefined && val != null && typeof val == "string";
}

export function isArray(val: any): boolean {
  return val !== undefined && val != null && Array.isArray(val);
}

export function strToDate(val: string): Date {
  const tmp: string = val.replace(/[\/\._]/g, "-").trim();
  const yearMonthDay =
    /(((20[012]\d|19\d\d)|(1\d|2[0123]))-((0[0-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01])))/;
  const dayMonthYear =
    /(((0[1-9])|([12][0-9])|(3[01]))-((0[0-9])|(1[012]))-((20[012]\d|19\d\d)|(1\d|2[0123])))/;

  let match = tmp.match(yearMonthDay);
  if (match) {
    const parts = tmp.split("-");
    return new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
  }

  match = tmp.match(dayMonthYear);
  if (match) {
    const parts = tmp.split("-");
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  }

  return null;
}

export function rndStr(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

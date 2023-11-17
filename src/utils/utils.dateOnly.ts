export class DateOnly {
  year: number;
  month: number;
  day: number;

  constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  static fromDate(date: Date): DateOnly {
    return new DateOnly(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
  }

  toString(): string {
    return `${this.year}-${String(this.month).padStart(2, "0")}-${String(
      this.day
    ).padStart(2, "0")}`;
  }
}

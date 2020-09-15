export class FilterOptions {
  fromDate: string;
  toDate: string;
  tags: Array<string>;
  offset: number;
  limit: number;

  constructor() {
    this.fromDate = '';
    this.toDate = '';
    this.tags = [];
    this.offset = 0;
    this.limit = 10;
  }

  updateOffset(): void {
    this.offset += this.limit;
  }

  getParametersString(): string {
    let query = '?offset=' + this.offset;
    query += '&limit=' + this.limit;
    query += '&fromDate=' + this.fromDate;
    query += '&toDate=' + this.toDate;
    query += '&tags=' + this.tags.toString();
    return query;
  }
}

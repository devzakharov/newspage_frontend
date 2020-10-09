import * as moment from 'moment';

export class FilterOptions {
  fromDate: string;
  toDate: string;
  tags: Array<string>;
  offset: number;
  limit: number;
  searchQuery: string;

  constructor() {
    // this.fromDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
    // this.toDate = moment().format('YYYY-MM-DD');
    this.tags = [];
    this.offset = 0;
    this.limit = 10;
    this.searchQuery = 'undefined';
  }

  updateOffset(): void {
    this.offset += this.limit;
  }

  getParametersString(): string {
    let query = '?offset=' + this.offset;
    query += '&limit=' + this.limit;
    query += '&fromDate=';
    this.fromDate === 'Invalid date' ? query += 'undefined' : query += this.fromDate;
    query += '&toDate=';
    this.toDate === 'Invalid date' ? query += 'undefined' : query += moment(this.toDate).add(1, 'day').format('YYYY-MM-DD');
    query += '&tags=' + this.tags.toString();
    query += '&search=' + this.searchQuery;
    return query;
  }
}

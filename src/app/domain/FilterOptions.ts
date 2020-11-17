import * as moment from 'moment';

export class FilterOptions {
  fromDate: string;
  toDate: string;
  tags: Array<string>;
  offset: number;
  limit: number;
  searchQuery: string;

  constructor() {
    this.fromDate = '';
    this.toDate = '';
    this.tags = [];
    this.offset = 0;
    this.limit = 10;
    this.searchQuery = '';
  }

  updateOffset(): void {
    this.offset += this.limit;
  }

  getParametersString(): string {
    let query = '?offset=' + this.offset;
    query += '&limit=' + this.limit;
    query += '&fromDate=';
    this.fromDate === 'Invalid date' ? query += '' : query += this.fromDate;
    query += '&toDate=';
    this.toDate === 'Invalid date' ? query += '' : query += moment(this.toDate).add(1, 'day').format('YYYY-MM-DD');
    query += '&tags=' + this.tags;
    query += '&search=' + this.searchQuery;
    return query;
  }
}

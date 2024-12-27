import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() { }
   public getCustomPaginator(): MatPaginatorIntl {
    const customPaginatorIntl = new MatPaginatorIntl();

    customPaginatorIntl.itemsPerPageLabel = 'items:'; 
    customPaginatorIntl.nextPageLabel = 'next page';
    customPaginatorIntl.previousPageLabel = 'previous page';

    customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const totalPages = Math.ceil(length / pageSize); 
      return `${page + 1} out of ${totalPages}`; 
    };

    return customPaginatorIntl;
  }
}

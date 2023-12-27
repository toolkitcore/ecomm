export interface TableQueryParams {
  pageIndex: number;
  pageSize: number;
  sort?: Array<{ key: string, value: TableSortOrder }>
}

export declare type TableSortOrder = string | 'ascend' | 'descend' | null;

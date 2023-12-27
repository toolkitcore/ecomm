import { Observable } from 'rxjs';
export interface HeaderTable {
  canFilter?: boolean;
  canSort?: boolean;
  isSortVisible?: boolean;
  label: string;
  key?: string;
  width?: number;
  dataType?: 'text' | 'date' | 'select';
  placeholder?: string;
  dataFilters?: Observable<Array<{ value: string, label: string }>>;
}
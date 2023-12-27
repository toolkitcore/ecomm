export interface Ward {
  name: string;
  code: string;
}
export interface District {
  name: string;
  code: string;
  wards: Ward[];
}
export interface Province {
  name: string;
  code: string;
  districts: District[];
}
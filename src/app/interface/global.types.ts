export type TMetaData = {
  page: number;
  limit: number;
  totalPage: number;
  totalItem: number;
};

export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

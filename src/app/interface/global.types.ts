import { dateRangeCategory } from "../constant/global.constant";

export type TDateCategory = keyof typeof dateRangeCategory;

export type TMetaData = {
  page: number;
  limit: number;
  totalPage: number;
  totalItem: number;
};

export interface Pagination<T> {
    page: number;
    pageSize: number;
    totalPage: number;
    items: T[] | any;
}
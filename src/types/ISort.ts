type SortType = 'expensive' | 'cheap' | 'popular' | 'news'

export interface ISort {
  type: SortType;
  title: string;
}

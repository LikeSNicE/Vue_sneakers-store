export interface MetaPagination {
  total_items: number
  total_pages: number
  current_page: number
  per_page: number
  remaining_count: number
}

export type Pagination<T> = {
  meta: MetaPagination
  items: T[]
}

// для прокидывания в компонентеты
export type PaginationProps = {
  currentPage: number | undefined
  totalPages: number | undefined
}

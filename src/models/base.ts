
export interface IBaseAllData<T = any> {
  data: T[]
  message: string
  status: 1 | 0
  total?: number
}

export interface IBaseOneData<T = any> {
  data: T
  message: string
  status: 1 | 0
  total?: number
}
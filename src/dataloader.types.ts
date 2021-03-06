export interface DataPersister {
  getItem: (key: string, meta?: Meta) => any
  setItem: (key: string, value: any, meta?: Meta) => any
  removeItem: (key: string, meta?: Meta) => any
}

export interface MandatoryProps<TData, TParams> {
  name: string
  apiCall: (params?: TParams) => Promise<TData>
}

export interface OptionalProps<TData = any, TParams = any> {
  ttl: number
  onSuccess: (data?: TData) => any
  onFailure: (error?: Error) => any
  interval: number
  shouldInterval: (data?: TData) => boolean
  params: TParams
  dataPersister: DataPersister | undefined
  lazyLoad: boolean
  dataKey: (name: string, params?: TParams) => string
}

export interface Meta<TData = any, TParams = any>
  extends MandatoryProps<TData, TParams>,
    OptionalProps<TData, TParams> {}

export interface LoaderStatus<TData = any> {
  data: TData | null
  loading: boolean
  error: Error | null
  lastUpdateTime?: number
  lastErrorTime?: number
}

export type DataLoaderProps<TData, TParams> = MandatoryProps<TData, TParams> &
  Partial<OptionalProps<TData, TParams>>

export interface LoaderData {
  [key: string]: LoaderStatus
}

export interface DataLoaderState {
  data: LoaderData
}

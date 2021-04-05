export type IStyle = { actionName?: string; path?: string; lineNumber?: string }

export type IOrder =
  | 'Action'
  | 'Previous State'
  | 'Current State'
  | 'State Differences'

import { diff as different } from 'deep-object-diff'

export const diff = (obj1: any, obj2: any) => {
  return different(obj1, obj2)
}

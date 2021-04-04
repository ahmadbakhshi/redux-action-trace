const initialState: any = {
  id: null
}

export const testReducer = (
  state: any = initialState,
  { type, payload }: any
): any => {
  switch (type) {
    case 'test':
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}

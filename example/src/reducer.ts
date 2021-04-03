const initialState: any = {
  type: null,
  message: '',
  displayPopUpMessage: false,
  cancel: () => {},
  confirm: () => {}
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

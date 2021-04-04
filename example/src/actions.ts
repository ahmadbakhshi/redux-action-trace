export const updateState = () => async (dispatch: any) => {
  dispatch({
    type: 'test',
    payload: { id: 1 }
  })
}

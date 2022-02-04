const state = {
  input: '0',
  history: null,
  operator: null,
  isResult: false,
}

export function getState() {
  return { ...state }
}

export function setState(obj) {
  Object.assign(state, obj)
}

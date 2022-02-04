import './style.scss'
import { getState, setState } from './utils/state'
import { getResult, getSymbol, isValid } from './utils/math'

const $history = document.querySelector('#history')
const $input = document.querySelector('#input')
const $numpad = document.querySelector('.numpad')

function print() {
  const { input, history, operator } = getState()
  const symbol = getSymbol(operator)

  $history.innerHTML = `${history || ''} ${symbol || ''}`
  $input.value = input
}

function handleClickNumber(e) {
  const { value } = e.target.dataset

  // restart if it's result
  if (getState().isResult) {
    setState({
      isResult: false,
      input: '0',
    })
  }

  const { input } = getState()

  // only one dot
  if (value === '.' && input.includes('.')) return

  // no leading zero
  if (value !== '.' && input === '0') {
    return setState({ input: value })
  }

  setState({ input: `${input}${value}` })
}

function handleClickOperator(e) {
  const { value: operator } = e.target.dataset
  const { input, history, operator: oldOperator, isResult } = getState()

  if (operator === 'result') {
    if (!oldOperator) return

    return setState({
      input: getResult(oldOperator, history, input),
      history: null,
      operator: null,
      isResult: true,
    })
  }

  if (operator === 'clearAll') {
    return setState({
      input: '0',
      history: null,
      operator: null,
      isResult: false,
    })
  }

  if (operator === 'clear') {
    return setState({
      input: '0',
      isResult: false,
    })
  }

  if (operator === 'back') {
    return setState({
      input: isResult || !input ? '0' : input.slice(0, -1),
      isResult: false,
    })
  }

  // change operator if there are no input
  if (input === '0' && history) {
    return setState({ operator })
  }

  // calculate result before changing operator
  if (oldOperator) {
    const result = getResult(oldOperator, history, input)

    if (isValid(result)) {
      return setState({
        input: result,
        history: null,
        operator: null,
        isResult: true,
      })
    }

    return setState({
      input: '0',
      history: result,
      operator,
      isResult: false,
    })
  }

  setState({
    input: '0',
    history: input,
    operator,
    isResult: false,
  })
}

$numpad.addEventListener('click', e => {
  if (e.target === $numpad) return

  if (Object.hasOwn(e.target.dataset, 'operator')) {
    handleClickOperator(e)
  } else {
    handleClickNumber(e)
  }

  print()
})

print()

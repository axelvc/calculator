const RESOLVERS = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
}

const SYMBOLS = {
  add: '&plus;',
  sub: '&minus;',
  multiply: '&times;',
  divide: '&divide;',
}

const INVALID = 'Undefined'

export function getResult(operation, a, b) {
  const resolver = RESOLVERS[operation]
  const result = resolver(Number(a), Number(b))

  if (Number.isNaN(result)) {
    return INVALID
  }

  return result.toString()
}

export function isValid(value) {
  return value !== INVALID
}

export function getSymbol(operation) {
  return SYMBOLS[operation]
}

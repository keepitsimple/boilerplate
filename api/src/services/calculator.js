export function tryParsePart (x, operators) {
  const number = Number.parseFloat(x)
  if (!isNaN(number)) return { isNumber: true, number }

  const operator = operators?.[x]
  if (operator) return { isOperator: true, operator }

  return null
}

class AbstractOperator {
  apply (a, b) {
    throw new TypeError('Method not implemented')
  }
}

class PlusOperator extends AbstractOperator {
  apply (a, b) {
    return a + b
  }
}

class MinusOperator extends AbstractOperator {
  apply (a, b) {
    return a - b
  }
}

class MultiplyOperator extends AbstractOperator {
  apply (a, b) {
    return a * b
  }
}

class DivideOperator extends AbstractOperator {
  apply (a, b) {
    if (b === 0) throw new Error('Divide by 0 is not allowed')
    return a / b
  }
}

class Calculator {
  constructor () {
    this.operators = {
      '+': new PlusOperator(),
      '-': new MinusOperator(),
      '*': new MultiplyOperator(),
      '/': new DivideOperator()
    }
  }

  evaluate (expression) {
    const parts = expression.match(/[\d.]+|\D+/g)
    if (parts === null) return null
    const parsedParts = parts.map(part => {
      const parseResult = tryParsePart(part, this.operators)
      if (parseResult.isNumber) return parseResult.number
      if (parseResult.isOperator) return parseResult.operator
      throw new Error(`Unexpected part: ${part}`)
    })
    console.log(parsedParts)
    const { result } = parsedParts.reduce(
      (acc, part) => {
        if (typeof part === 'number') {
          if (acc.queuedOperator === null) {
            return { ...acc, result: part }
          }
          return {
            result: acc.queuedOperator.apply(acc.result, part),
            queuedOperator: null
          }
        }
        return {
          ...acc,
          queuedOperator: part
        }
      }, { result: 0, queuedOperator: null }
    )

    return result
  }
}

const calculator = new Calculator()
export default calculator

import express from 'express'

const apiv1 = express.Router()
const SupportedOperators = ['+', '-', '*', '/', '^']

export function validate ({ operator = '', operands = {} } = {}) {
  if (operator && SupportedOperators.includes(operator) && operands) {
    const a = parseFloat('' + operands?.a)
    const b = parseFloat('' + operands?.b)
    if (!isNaN(a) && !isNaN(b)) {
      // divide by 0 is not allowed
      // if (operator === '/' && b === 0) {
      //   return null
      // }
      return { operator, operands: { a, b } }
    }
  }
  return null
}

export function calculate (operation, operands) {
  const { a, b } = operands
  switch (operation) {
    case '+':
      return a + b
    case '-':
      return a - b
    case '*':
      return a * b
    case '/':
      if (b === 0) {
        return 'Infinity'
      }
      return a / b
    case '^':
      return a ^ b

    default:
  }

  return null
}

apiv1.post('/calculator', (req, res) => {
  try {
    const params = validate(req.body)
    if (!params) {
      res.status(422).json({ error: 'Invalid parameters' })
      return
    }
    console.log(params)
    res.json({ result: calculate(params.operator, params.operands) })
  } catch (e) {
    res.status(500).json({ error: e?.message })
  }
})

export default apiv1

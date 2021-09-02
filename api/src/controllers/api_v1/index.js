import express from 'express'
import calculator from '../../services/calculator'

const apiv1 = express.Router()

apiv1.post('/calculator', (req, res) => {
  try {
    const { expression } = req.body
    if (!expression) {
      res.status(422).json({ error: 'Invalid request: expression is expected' })
      return
    }
    res.json(calculator.evaluate(expression))
  } catch (e) {
    if (e instanceof EvalError) {
      res.status(422).json({ error: `Invalid request: ${e?.message} ` })
      return
    }

    res.status(500).json({ error: e?.message })
  }
})

export default apiv1

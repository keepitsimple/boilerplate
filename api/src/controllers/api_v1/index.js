import express from 'express'

const apiv1 = express.Router()

apiv1.get('/calculator', (req, res) => {
  res.send('Hello from APIv1 root route.')
})

export default apiv1

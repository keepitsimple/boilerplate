import React, { useState  } from 'react'
import axios from 'axios'

import './App.css'

function App () {
  const [inputFields, setInputFields] = useState({
    operandA: '',
    operandB: '',
    operator: '+'
  })

  const [result, setResult] = useState('')

  const changeHandler = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const expression = [inputFields.operandA, inputFields.operator, inputFields.operandB].join('')
    axios.post('http://localhost:3000/api/v1/calculator', { expression }).then(
      res => {
        setResult(res.data.result)
      }
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        Calculator
      </header>
      <form className="App-form" onSubmit={submitHandler}>
        <input className="App-form-input" type="number" name="operandA" value={inputFields.operandA} onChange={changeHandler}/>
        <select name="operator" value={inputFields.operator} onChange={changeHandler}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input className="App-form-input" type="number" name="operandB" value={inputFields.operandB} onChange={changeHandler}/>=
        <input className="App-form-input" disabled type="text" name="result" value={result}/>
        <input className="App-form-button" type="submit" value="Count"/>
      </form>
    </div>
  )
}

export default App

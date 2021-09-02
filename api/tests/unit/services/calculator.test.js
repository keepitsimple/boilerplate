import calculator from '../../../src/services/calculator'

// eslint-disable-next-line max-lines-per-function
describe('Tests for calculator service', () => {
  it('should evaluate expression', () => {
    expect(calculator.evaluate('1+2')).toEqual({ result: 3 })
    expect(calculator.evaluate('6+2-3')).toEqual({ result: 5 })
    expect(calculator.evaluate('0.6+2')).toEqual({ result: 2.6 })
    expect(calculator.evaluate('6/2-3')).toEqual({ result: 0 })
    expect(calculator.evaluate('6*2/3')).toEqual({ result: 4 })
  })

  it('should throw exception if divide by 0', () => {
    expect(() => {
      calculator.evaluate('1/0')
    }).toThrow('Divide by 0 is not allowed')
  })
})

import { validate, calculate } from '../../src/controllers/api_v1/index'

// eslint-disable-next-line max-lines-per-function
describe('Tests for validate function', () => {
  it('should return null if called with invalid params', () => {
    let res = validate()
    expect(res).toBe(null)

    res = validate({ operator: '-' })
    expect(res).toBe(null)

    res = validate({ operator: '+', operands: { a: '12' } })
    expect(res).toBe(null)
  })

  it('should return operator and operands: {a, b} as numbers', () => {
    const res = validate({ operator: '+', operands: { a: '12', b: '-7' } })
    expect(res).toEqual({ operator: '+', operands: { a: 12, b: -7 } })
  })
})

// eslint-disable-next-line max-lines-per-function
describe('Tests for calculate function', () => {
  it('test "+" operations', () => {
    expect(calculate('+', { a: 12, b: -7 })).toBe(5)
    expect(calculate('+', { a: 0.5, b: 0.5 })).toBe(1)
    expect(calculate('+', { a: 0.1, b: 0.5 })).toBe(0.6)
  })

  it('test "-" operations', () => {
    expect(calculate('-', { a: 12, b: -7 })).toBe(19)
    expect(calculate('-', { a: 0.5, b: 0.5 })).toBe(0)
    expect(calculate('-', { a: 0.1, b: 0.5 })).toBe(-0.4)
  })

  it('test "*" operations', () => {
    expect(calculate('*', { a: 12, b: -7 })).toBe(-84)
    expect(calculate('*', { a: 0.5, b: 0.5 })).toBe(0.25)
    expect(calculate('*', { a: 0.1, b: 0.5 })).toBe(0.05)
  })

  it('test "/" operations', () => {
    expect(calculate('/', { a: 12, b: -3 })).toBe(-4)
    expect(calculate('/', { a: 0.5, b: 0.5 })).toBe(1)
    expect(calculate('/', { a: 0.1, b: 0.5 })).toBe(0.2)
    expect(calculate('/', { a: 0.1, b: 0 })).toBe('Infinity')
  })
})

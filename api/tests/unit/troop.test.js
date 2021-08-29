import { generateUniq, between } from '../../src/controllers/troop'

const UnitTypes = process.env.UNIT_TYPES?.split(',')
const MaxTroopSize = Number(process.env.MAX_TROOP_SIZE)

const expectedObjStructure = UnitTypes.reduce((r, val) => {
  r[val] = expect.any(Number)
  return r
}, {})

// eslint-disable-next-line max-lines-per-function
describe('Tests for troop.generateUniq() function', () => {
  it('should throw an error if called with invalid value', () => {
    expect(() => {
      generateUniq(0)
    }).toThrow('Invalid amount')
    expect(() => {
      generateUniq()
    }).toThrow('Invalid amount')
    expect(() => {
      generateUniq(MaxTroopSize + 1)
    }).toThrow('Invalid amount')
  })

  it('size 1', () => {
    const amount = 1
    const res = generateUniq(amount)

    const keys = Object.keys(res)
    // expect all unit types in response
    expect(keys.length).toBe(UnitTypes.length)
    expect(res).toEqual(expect.objectContaining(expectedObjStructure))

    const sumOfAllUnits = Object.values(res).reduce((t, val) => t + val, 0)
    expect(sumOfAllUnits).toBe(amount)
  })

  it('size between [2, UnitTypes.length]', () => {
    const amount = between(2, UnitTypes.length)
    const res = generateUniq(amount)

    const keys = Object.keys(res)
    // expect all unit types in response
    expect(keys.length).toBe(UnitTypes.length)
    expect(res).toEqual(expect.objectContaining(expectedObjStructure))
    const sumOfAllUnits = Object.values(res).reduce((t, val) => t + val, 0)
    expect(sumOfAllUnits).toBe(amount)
  })

  it('size 167', () => {
    const amount = 167
    const res = generateUniq(amount)
    const keys = Object.keys(res)
    // expect all unit types in response
    expect(keys.length).toBe(UnitTypes.length)
    expect(res).toEqual(expect.objectContaining(expectedObjStructure))
    const sumOfAllUnits = Object.values(res).reduce((t, val) => t + val, 0)
    expect(sumOfAllUnits).toBe(amount)
  })

  it('result is non-deterministic for 100 requests, amount 99999', () => {
    const amount = 99999
    const objsAsStrings = []
    for (let i = 1; i <= 100; i++) {
      const res = generateUniq(amount)
      const keys = Object.keys(res)
      // expect all unit types in response
      expect(keys.length).toBe(UnitTypes.length)
      expect(res).toEqual(expect.objectContaining(expectedObjStructure))
      const sumOfAllUnits = Object.values(res).reduce((t, val) => t + val, 0)
      expect(sumOfAllUnits).toBe(amount)

      // Convert object into string like prop+value, but all properties are sorted
      const objAsStr = keys.sort().reduce((r, val) => (r + val + res[val]), '')
      objsAsStrings.push(objAsStr)
    }
    // expect no duplicates
    expect(new Set(objsAsStrings).size).toBe(objsAsStrings.length)
  })
})

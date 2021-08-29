import { STATUS_CODES } from 'http'

const UnitTypes = process.env.UNIT_TYPES?.split(',') || ['Spearmen', 'Swordsmen', 'Archers']

const MaxTroopSize = Number(process.env.MAX_TROOP_SIZE) || 999999
const MaxTroopSizeLen = MaxTroopSize.toString().length

/**
 * Generate random integer between min & max (inclusive max)
 * @param min
 * @param max
 * @returns {number}
 */
export function between (min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

/**
 * Returns new shuffled array
 * @param array
 * @returns {*[]}
 */
function shuffle (array) {
  return [...array].sort(() => 0.5 - Math.random())
}

/**
 * Validate requested amount. The value should be between [1, MaxTroopSize]
 * @param unitsAmount: string
 * @returns {number}
 */
function validate (unitsAmount) {
  if (unitsAmount.length > MaxTroopSizeLen || unitsAmount === '0') {
    return 0
  }
  const amount = parseInt(unitsAmount)
  return amount > MaxTroopSize ? 0 : amount
}

/**
 * Generate unique troop for requested amount
 * @param amount must be integer value in range [1, MaxTroopSize]
 * @returns {{}}
 */
export function generateUniq (amount) {
  if (!amount || amount < 1 || amount > MaxTroopSize) {
    throw new Error('Invalid amount')
  }
  // use shuffle on UnitTypes for better result randomization; in other case UnitType[0] has potential preference
  const unitTypes = shuffle(UnitTypes)
  const result = {}
  let total = 0
  for (let i = 0; i < unitTypes.length - 1; i++) {
    const num = between(0, amount - total)
    total += num
    result[unitTypes[i]] = num
  }
  // fill in remaining amount with the last unit type
  result[unitTypes[unitTypes.length - 1]] = amount - total
  return result
}

/**
 * Expect only URLs like `/[number]`, but ANY integer number can be received
 * @param req
 * @param resp
 */
function troop (req, resp) {
  const requestedUnitsAmount = req.url.substr(1)
  const amount = validate(requestedUnitsAmount)
  if (!amount) {
    resp.writeHead(400, STATUS_CODES[400], {})
    resp.end(`Bad request. Try number between [1, ${MaxTroopSize}]`)
    return
  }
  const units = generateUniq(amount)
  resp.log.info(units)
  resp.writeHead(200, { 'Content-Type': 'application/json' })
  resp.end(JSON.stringify(units))
}

export default troop

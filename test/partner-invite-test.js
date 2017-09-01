'use strice'

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const partnerFinder = require('../partner-invite.js')
const expect = require('expect')

describe('Should return with correct data', () => {
  it('Should test degrees is converting to radian', () => {
    let result = partnerFinder.degreeToRadian
    expect(result(50)).toExist()
    expect(result(50)).toBeA('number')
    expect(result(50)).toBeGreaterThanOrEqualTo(0.87)
  })
  it('Should test that distance is being calculated', () => {
    let result = partnerFinder.distanceFromOffice
    expect(result(51.515419, -0.141099, 52.0629009, -1.3397750000000315)).toExist()
    expect(result(51.515419, -0.141099, 52.0629009, -1.3397750000000315)).toBeA('number')
    expect(result(51.515419, -0.141099, 52.0629009, -1.3397750000000315)).toBeGreaterThanOrEqualTo(100)
  })
  it('Should ensure the distance calculator function exists', () => {
    let result = partnerFinder.findPartners
    expect(result).toExist()
    expect(result).toBeA('function')
  })
})

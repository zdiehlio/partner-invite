'use strict'

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

let request = new XMLHttpRequest()

const partnerFinder = module.exports = {}
let partnerList = []

//make a new get request using xmlhttp
request.open('GET', 'https://success.spidergap.com/partners.json?inf_contact_key=865875f0b9defa6bc46bf92f665f1ffbf1f7bf37dacf755a60126ee79f7e296e')
request.responseType = 'text'
request.send()

//function to convert degrees to radian
partnerFinder.degreeToRadian = (deg) => {
  return deg * (Math.PI/180)
}

//using the Haversine formula, calculate the distance between 2 sets of coordinates
partnerFinder.distanceFromOffice = (lat1,lon1,lat2,lon2) => {
  var R = 6371
  var dLat = partnerFinder.degreeToRadian(lat2-lat1)
  var dLon = partnerFinder.degreeToRadian(lon2-lon1)
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(partnerFinder.degreeToRadian(lat1)) * Math.cos(partnerFinder.degreeToRadian(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  var d = R * c
  return d
}

//loop through the list of partners and return those within 100km into an array for later use
partnerFinder.findPartners = () => {
  let partnerData = JSON.parse(request.responseText)
  let officeLocationLat = 51.515419
  let officeLocationLon = -0.141099
  let partnerLocationCoord
  let partnerLocationLat
  let partnerLocationLon
  for(let i = 0; i < partnerData.length; i++){
    partnerLocationCoord = partnerData[i].offices[0].coordinates.split(',')
    partnerLocationLat = partnerLocationCoord[0]
    partnerLocationLon = partnerLocationCoord[1]
    let distance = partnerFinder.distanceFromOffice(officeLocationLat, officeLocationLon, partnerLocationLat, partnerLocationLon)
    if(distance <= 100){
      partnerList.push(partnerData[i].organization)
    }
  }
  console.log(partnerList)
}
request.addEventListener('load', partnerFinder.findPartners)

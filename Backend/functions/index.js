require('dotenv').config()
const functions = require('firebase-functions');
const admin = require('firebase-admin')
const cors = require('cors')
const express = require('express')
const website = require('./db/brand.js')
const serviceAccount = require("./loyalty-card-dapp-firebase-adminsdk.json");

const expressApp = express()
expressApp.use(cors({ origin: true }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loyalty-card-dapp.firebaseio.com"
});

const prepareData = (data, method) => {
  let params = []
  if(method === 'addBrand') {
    params.push('brandName', 'brandAddress', 'tokenName', 'tokenSymbol', 'tokenDecimal')
  }

  for (let key in data) {
    if (data[key] === '') {
      delete data[key]
    } else if(!params.includes(key)){
      delete data[key]
    } else {
      params.splice(params.indexOf(key), 1)
    }
  }
  
  data["length"] = Object.keys(data).length
  data['missingParams'] = params

  return data
}

const getBrandList = async (req, res) => {
  try {
    const Brands = await website.getBrandList(admin.database())
    return res.status(200).json(Brands)
  } catch (err) {
    return res.status(500).json(err)
  }
}

const addBrand = async (req, res) => {
    try {
      const brandData = prepareData(req.body, "addBrand")
      if(brandData.length === 5) {
        delete brandData['missingParams']
        delete brandData['length']
        const brandExists = await website.getByBrandAddress(admin.database(), brandData.brandAddress)
        if(!brandExists){
          const tokenAddress = await website.createLoyaltyToken(brandData)
          if(!Object.keys(tokenAddress).includes('error')) {
            const newBrandkey = await website.addNewBrand(admin.database(), brandData)
            const newBrand = await website.getBrandById(admin.database(), newBrandkey)
            return res.status(200).json(newBrand)
          } else {
            return res.status(500).json(tokenAddress.error.message)
          }
        } else {
          return res.status(400).json(`brand with address ${brandData.brandAddress} already exists`)
        }
      } else {
        return res.status(400).json(`these Parameters are missing or empty ${brandData.missingParams}`)
      }
    } catch (err) {
      return res.status(500).json(err)
    }
}

expressApp.get('/', getBrandList)
expressApp.post('/', addBrand)

exports.Brands = functions.https.onRequest(expressApp)
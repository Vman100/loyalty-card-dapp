import config from './config.js'

export const getBrandList = async () => {
  const response = await fetch(`${config.development.backenUrl}`, {
    method: 'get',
    mode: 'cors',
  })
  const json = await response.json()
  const list = Object.keys(json).map(key => json[key])
  console.log('get Brand List', list)
  return list
}

export const addNewBrand = async brandData => {
  const rawResponse = await fetch(`${config.development.backenUrl}`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(brandData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const json = await rawResponse.json()
  console.log('add Brand', json)
  return json
}

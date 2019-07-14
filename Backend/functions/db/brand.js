exports.getByBrandAddress = async (database, brandAdress) => {
  try {
    const response = await database.ref().child('Brands')
    .orderByChild('brandAddress').equalTo(brandAdress).once("value")
    console.log('exists', response.exists())
    return response.exists();
  } catch(err) {
    return err
  }
}

exports.getBrandList = async (database) => {
  try {
    const response = await database.ref('Brands').once('value')
    console.log('response', response.val())
    return response.val();
  } catch(err) {
    return err
  }
}

exports.getBrandById = async (database, id) => {
  try {
    const response = await database.ref('Brands/' + id).once('value')
    console.log('response', {[id]: response.val()})
    return {[id]: response.val()};
  } catch (err) {
    return err
  }
}

exports.addNewBrand = async (database, brandData) => {
  try {
    const newBrandkey = await database.ref().child('Brands').push().key;
    const updates = {}
    const path = "Brands/" + newBrandkey
    updates[path] = { ...brandData }
    await database.ref().update(updates);
    return newBrandkey
  } catch(err) {
    return err
  }
}
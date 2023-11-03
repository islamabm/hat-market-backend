const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
  try {
    const collection = await dbService.getCollection('categories')

    var stations = await collection.find().toArray()

    return stations
  } catch (err) {
    logger.error('cannot find stations', err)
    throw err
  }
}

async function getById(stationId) {
  try {
    const collection = await dbService.getCollection('categories')

    const station = collection.findOne({ _id: new ObjectId(stationId) })

    return station
  } catch (err) {
    logger.error(`while finding station ${stationId}`, err)
    throw err
  }
}

// async function remove(stationId) {
//   try {
//     const collection = await dbService.getCollection('react_playlist')
//     await collection.deleteOne({ _id: new ObjectId(stationId) })
//     return stationId
//   } catch (err) {
//     logger.error(`cannot remove station ${stationId}`, err)
//     throw err
//   }
// }

async function add(station) {
  try {
    const collection = await dbService.getCollection('categories')
    await collection.insertOne(station)
    return station
  } catch (err) {
    logger.error('cannot insert station', err)
    throw err
  }
}

// async function update(station) {
//   try {
//     const stationToSave = {
//       name: station.name,
//       desc: station.desc,
//       imgUrl: station.imgUrl,
//     }
//     const collection = await dbService.getCollection('react_playlist')
//     await collection.updateOne(
//       { _id: new ObjectId(station._id) },
//       { $set: stationToSave }
//     )
//     return station
//   } catch (err) {
//     logger.error(`cannot update station ${station._id}`, err)
//     throw err
//   }
// }

// async function updateSongs(stationId, songs) {
//   try {
//     const collection = await dbService.getCollection('react_playlist')
//     const station = await collection.findOneAndUpdate(
//       { _id: new ObjectId(stationId) },
//       { $set: { songs: songs } },
//       { returnOriginal: false }
//     )
//     return station.value
//   } catch (err) {
//     logger.error(`cannot update station ${stationId}`, err)
//     throw err
//   }
// }

async function addTheProduct(categoryNameInEnglish, product, subCategoryName) {
  try {
    const collection = await dbService.getCollection('categories')
    const category = await collection.findOne({ categoryNameInEnglish })
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    console.log("categories: " + JSON.stringify(category, null, 2));
    if (!category) {
      throw new Error(`Category with name ${categoryNameInEnglish} not found`)
    }

    const subCategory = category.subCategories.find(subCat => subCat.subCategoryNameInEnglish === subCategoryName)

    if (!subCategory) {
      throw new Error(`Subcategory with name ${subCategoryName} not found in category ${categoryNameInEnglish}`)
    }

    subCategory.products.push(product)

    await collection.updateOne({ categoryNameInEnglish }, { $set: { subCategories: category.subCategories } })

    return product
  } catch (err) {
    logger.error(`Cannot add product to subcategory ${subCategoryName} in category ${categoryNameInEnglish}`, err)
    throw err
  }
}
async function addThesubCategory(categoryNameInEnglish, subCategory) {
  try {
    const collection = await dbService.getCollection('categories')
    const category = await collection.findOne({ categoryNameInEnglish })

    if (!category) {
      throw new Error(`Category with name ${categoryNameInEnglish} not found`)
    }


    category.subCategories.push(subCategory)

    await collection.updateOne({ categoryNameInEnglish }, { $set: { subCategories: category.subCategories } })

    return subCategory
  } catch (err) {
    logger.error(`Cannot add product to subcategory ${categoryNameInEnglish} in category ${categoryNameInEnglish}`, err)
    throw err
  }
}

// async function removeStationSong(stationId, songId) {
//   try {
//     const collection = await dbService.getCollection('react_playlist')
//     const station = await collection.updateOne(
//       { _id: new ObjectId(stationId) },
//       { $pull: { songs: { _id: songId } } }
//     )
//     return songId
//   } catch (err) {
//     logger.error(`cannot add station msg ${stationId}`, err)
//     throw err
//   }
// }
module.exports = {
  // remove,
  query,
  getById,
  add,
  // update,
  addTheProduct,
  // removeStationSong,
  // updateSongs,
  addThesubCategory,
}

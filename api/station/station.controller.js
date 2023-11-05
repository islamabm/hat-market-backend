const stationService = require('./station.service.js')

const logger = require('../../services/logger.service')
async function getStations(req, res) {
  try {
    const stations = await stationService.query()
    res.json(stations)
  } catch (err) {
    logger.error('Failed to get stations', err)
    res.status(500).send({ err: 'Failed to get stations' })
  }
}

async function getStationById(req, res) {
  try {
    const stationId = req.params.id
    const station = await stationService.getById(stationId)
    res.json(station)
  } catch (err) {
    logger.error('Failed to get station', err)
    res.status(500).send({ err: 'Failed to get station' })
  }
}
async function getProductsById(req, res) {
  try {
    const catId = req.params.catId
    const subId = req.params.subId
    const products = await stationService.getProducts(catId, subId)
    res.json(products)
  } catch (err) {
    logger.error('Failed to get products', err)
    res.status(500).send({ err: 'Failed to get station' })
  }
}

async function addStation(req, res) {
  try {
    const station = req.body
    const addedStation = await stationService.add(station)
    res.json(addedStation)
  } catch (err) {
    logger.error('Failed to add station', err)
    res.status(500).send({ err: 'Failed to add station' })
  }
}

async function updateStation(req, res) {
  try {
    const station = req.body
    const updatedStation = await stationService.update(station)
    res.json(updatedStation)
  } catch (err) {
    logger.error('Failed to update station', err)
    res.status(500).send({ err: 'Failed to update station' })
  }
}

async function removeStation(req, res) {
  try {
    const stationId = req.params.id
    const removedId = await stationService.remove(stationId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove station', err)
    res.status(500).send({ err: 'Failed to remove station' })
  }
}

async function addProductToSubCategoryInCategory(req, res) {
  try {
    const categoryName = req.params.id
    const subCategoryName = req.params.name
    const product = req.body.product
    const savedSong = await stationService.addTheProduct(categoryName, product, subCategoryName)
    res.json(savedSong)
  } catch (err) {
    logger.error('Failed to update station', err)
    res.status(500).send({ err: 'Failed to update station' })
  }
}
async function addSubCategoryToCategory(req, res) {
  try {
    const categoryName = req.params.categoryName

    const subCategory = req.body.newSubCategory
    console.log("subCategory", subCategory)
    const savedSubCategory = await stationService.addThesubCategory(categoryName, subCategory)
    res.json(savedSubCategory)
  } catch (err) {
    logger.error('Failed to update station', err)
    res.status(500).send({ err: 'Failed to update station' })
  }
}

//Step 5
async function removeStationSong(req, res) {
  try {
    const stationId = req.params.id
    const songId = req.params.songId
    const removedSongDetails = await stationService.removeStationSong(
      stationId,
      songId
    )
    res.send(removedSongDetails)
  } catch (err) {
    logger.error('Failed to remove song', err)
    res.status(500).send({ err: 'Failed to remove song' })
  }
}

async function updateStationSongs(req, res) {
  try {
    const stationId = req.params.id
    const songs = req.body.songs
    const station = await stationService.updateSongs(stationId, songs)
    res.json(station)
  } catch (err) {
    logger.error('Failed to update station', err)
    res.status(500).send({ err: 'Failed to update station' })
  }
}

module.exports = {
  getStations,
  getStationById,
  addStation,
  updateStation,
  updateStationSongs,
  removeStation,
  addProductToSubCategoryInCategory,
  removeStationSong,
  addSubCategoryToCategory,
  getProductsById,
}

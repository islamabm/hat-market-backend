const express = require('express')
const {
  requireAuth,
  requireAdmin,
} = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const {
  getStations,
  getStationById,
  addStation,
  updateStation,
  removeStation,
  addProductToSubCategoryInCategory,
  removeStationSong,
  updateStationSongs,
  addSubCategoryToCategory,
} = require('./station.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getStations)
// router.get('/:category', log, getStations);
router.get('/:id', getStationById)
router.post('/', addStation)
router.put('/:id', updateStation)
router.put('/songs/:id', updateStationSongs)
router.delete('/:id', removeStation)
router.delete('/:id/song/:songId', removeStationSong)
// router.post('/', requireAuth, addStation)
// router.put('/:id', requireAuth, updateStation)
// router.delete('/:id', requireAuth, requireAdmin, removeStation)
// return httpService.post(`station/${categoryNameInEnglish}/add/subCategory`, { newSubCategory })
// return httpService.post(`station/${categoryName}/category/${subCategoryName}/product`, { product })
router.post('/:id/category/:name/product', addProductToSubCategoryInCategory)
router.post('/:categoryName/add/subCategory', addSubCategoryToCategory)
//Step 4

module.exports = router

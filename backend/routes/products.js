const express = require('express');
const router = express.Router();
const {
  getArtClasses,
  getSmallGifts,
  getArtSupplies,
  getReturnGifts,
  getAllProducts
} = require('../controllers/productController');

/**
 * @swagger
 * /api/art-classes:
 *   get:
 *     summary: Get all art classes
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of art classes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/art-classes', getArtClasses);

/**
 * @swagger
 * /api/small-gifts:
 *   get:
 *     summary: Get all small gifts
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of small gifts
 */
router.get('/small-gifts', getSmallGifts);

/**
 * @swagger
 * /api/art-supplies:
 *   get:
 *     summary: Get all art supplies
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of art supplies
 */
router.get('/art-supplies', getArtSupplies);

/**
 * @swagger
 * /api/return-gifts:
 *   get:
 *     summary: Get all return gifts
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of return gifts
 */
router.get('/return-gifts', getReturnGifts);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products or filter by category
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [classes, gifts, supplies, return-gifts]
 *         description: Category to filter products
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', getAllProducts);

module.exports = router;
const express = require('express');
const SearchService = require('../services/search');

const config = require('../config');

const router = express.Router();

const { checkCrudPermissions } = require('../middlewares/check-permissions');
router.use(checkCrudPermissions('search'));

/**
 * @swagger
 * path:
 *  /api/search:
 *    post:
 *      summary: Search
 *      description: Search results across multiple tables
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                searchQuery:
 *                  type: string
 *              required:
 *                - searchQuery
 *      responses:
 *        200:
 *          description: Successful request
 *        400:
 *          description: Invalid request
 *        500:
 *          description: Internal server error
 */

router.post('/', async (req, res) => {
  const { searchQuery, organizationId } = req.body;

  const globalAccess = req.currentUser.app_role.globalAccess;

  if (!searchQuery) {
    return res.status(400).json({ error: 'Please enter a search query' });
  }

  try {
    const foundMatches = await SearchService.search(
      searchQuery,
      req.currentUser,
      organizationId,
      globalAccess,
    );
    res.json(foundMatches);
  } catch (error) {
    console.error('Internal Server Error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

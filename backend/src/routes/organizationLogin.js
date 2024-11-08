const express = require('express');

const InstitutesDBApi = require('../db/api/institutes');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

/**
 *  @swagger
 *  /api/organizations:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Organizations]
 *      summary: Get all organizations
 *      description: Get all organizations
 *      responses:
 *        200:
 *          description: Organizations list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Organizations"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */

router.get(
  '/',
  wrapAsync(async (req, res) => {
    const payload = await InstitutesDBApi.findAll(req.query);
    const simplifiedPayload = payload.rows.map((org) => ({
      id: org.id,
      name: org.name,
    }));
    res.status(200).send(simplifiedPayload);
  }),
);

module.exports = router;

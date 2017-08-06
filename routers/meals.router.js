const express = require ('express');
const router = express.Router();
// test data
const meal1 = require('./testdata/meal1'); 

router.get('/meal', (request, response) => {
  response.json(meal1);
});


module.exports = router;
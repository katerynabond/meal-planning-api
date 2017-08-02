const express = require ('express');
const router = express.Router();

router.get('/meal', (request, response) => {
  response.send('Meal to come');
});


module.exports = router;
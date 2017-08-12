const express = require ('express');
const router = express.Router();
// test data
const meal1 = require('./testdata/meal1'); 
const mealsList = require('./testdata/meals'); 


router.get('/meal/:date/:course', (request, response) => {
  console.log(`requesting date:${request.params.date} course:${request.params.course}`);
  var d = new Date(request.params.date);
  var mealToReturn = JSON.parse(JSON.stringify(meal1));
  mealToReturn.description += ` (${request.params.course})`;
  mealToReturn.description += ` for date:${d.toDateString()}`;
  response.json(mealToReturn);
});

router.get('/meals/:course', (request, response) => {
  console.log(`/meals/:course course:${request.params.course}`);
  var list = JSON.parse(JSON.stringify(mealsList));
  list[0].title += ` (${request.params.course})`;
  response.json(list);
});


module.exports = router;
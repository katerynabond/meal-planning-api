const express = require('express');
const router = express.Router();
// test data
const meal1 = require('./testdata/meal1');
const mealsList = require('./testdata/meals');
const Meal = require('./models/meal.model');
const Plan = require('./models/plan.model');


router.get('/meal/:date/:course', (request, response) => {
  console.log(`requesting date:${request.params.date} course:${request.params.course}`);
  var d = new Date(request.params.date);
  var mealToReturn = JSON.parse(JSON.stringify(meal1));
  mealToReturn.description += ` (${request.params.course})`;
  mealToReturn.description += ` for date:${d.toDateString()}`;
  response.json(mealToReturn);
});

router.get('/plan/:week/:course', (request, response) => {
  var d = new Date(request.params.week);
  console.log(`getting plan for week of ${d} course:${request.params.course}`);
  Plan.findOne({ week: d, course: request.params.course })
    .populate('meals')
    .exec((err, plan) => {
      if (err) return response.status(500).json({ error: err });
      response.json(plan.meals);
    });
});

router.get('/meals/:course', (request, response) => {
  console.log(`/meals/:course course:${request.params.course}`);
  Meal.find({ courses: request.params.course }, (err, meals) => {
    if (err) return response.status(500).json({ error: err });
    response.json(meals);
  });

  // var list = JSON.parse(JSON.stringify(mealsList));
  // list[0].title += ` (${request.params.course})`;
  // response.json(list);
});


module.exports = router;
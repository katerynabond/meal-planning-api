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

router.post('/plan/:week/:course', (request, response) => {
  console.log(`[POST] plan add week:${request.params.week} course:${request.params.course} mealId:${request.body.mealId}`);
  var date = new Date(request.params.week);
  Plan.findOne({ week: date, course: request.params.course }, (err, plan) => {
    if (!plan) { // No plan found for this week, creating
      var plan = new Plan({
        week: date,
        course: request.params.course,
        meals: [request.body.mealId]
      });
      plan.save((err, plan) => {
        if (err) return response.status(500).json({ error: err });
        response.json({ success: true });
      });
    } else { // Plan found, adding meal
      plan.meals.push(request.body.mealId);
      plan.save((err, plan) => {
        if (err) return response.status(500).json({ error: err });
        response.json({ success: true });
      });
    }
  });
});

router.delete('/plan/:week/:course/:mealId', (request, response) => {
  console.log(`[DELETE] plan add week:${request.params.week} course:${request.params.course} mealId:${request.params.mealId}`);
  var date = new Date(request.params.week);
  Plan.findOne({ week: date, course: request.params.course }, (err, plan) => {
    if (plan) {
      var index = plan.meals.indexOf(request.params.mealId);
      if (index > -1) plan.meals.splice(index, 1);
      plan.save((err, plan) => {
        if (err) return response.status(500).json({ error: err });
        response.json({ success: true });
      });
    } else {
      return response.status(200).json({ success: true });
    }
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
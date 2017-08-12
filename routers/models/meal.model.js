const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    description: String,
    ingredients: [String],
    ingredientSections:[{title:String, ingredients:[String]}],
    preparationSteps: [String],
    calories: String,
    cookingTime: String,
    likes: Number,
    courses: [String]
});

const Meal = mongoose.model('Meal', mealSchema, "Meals");
module.exports = Meal;
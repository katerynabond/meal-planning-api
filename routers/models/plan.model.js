const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
    week: Date,
    course: String,
    meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
});

const Plan = mongoose.model('Plan', planSchema, 'Plans');

module.exports = Plan;
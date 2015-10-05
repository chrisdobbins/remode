var mongoose = require('mongoose');
var HabitSchema = new mongoose.Schema({
    name: String,
    duration: {type: Number, default: 21},
    currentStreak: {type: Number, default: 0},
    adherence: {type: Number}
});

module.exports = mongoose.model('Habit', HabitSchema);

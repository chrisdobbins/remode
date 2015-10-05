var express = require('express');
var router = express.Router();
var Habit = require('../models/habit');

function handleError(response, message, status) {
    response.statusCode = status;
    var error = new Error(message);
    return error;
}

var authenticate = function(request, response, next) {
    if(!request.isAuthenticated()) {
        response.redirect('/');
    }
    else {
        next();
    }
}

// INDEX
router.get('/', authenticate, function(request, response, next){
    console.log('HABITS:index');
    var habits = global.currentUser.habits;
    response.render('habits/index', {habits: habits, message: request.flash()});
});

// NEW
router.get('/new', authenticate, function(request, reponse, next) {
    var habit = {
        name: '',
        duration: ''
    };
    response.render('habits/new', {habit: habit, message: request.flash()});
});

// SHOW
router.get('/:id', authenticate, function(request, response, next){
    var habit = currentUser.habits.id(request.params.id);
    if (!habit) return next(handleError(response, 'Document not found', 404));
    response.render('habits/show', {habit: habit, message: request.flash()});
});

// EDIT
router.get('/:id/edit', authenticate, function(request, response, next) {
    var habit = currentUser.habits.id(request.params.id);
    if (!habit) return next(handleError(response, 'Document not found', 404));
    response.render('habits/edit', {habit: habit, message: request.flash()});
});

// CREATE
router.post('/', authenticate, function(request, response, next){
    var habit = {
        name: request.body.name,
        duration: request.body.duration
    };
    currentUser.habits.push(habit);
    currentUser.save(function(err) {
        if (err) return next(err);
        response.redirect('/habits');
    });
});

// UPDATE
router.put('/:id', authenticate, function(request, response, next) {
    var habit = currentUser.habits.id(request.params.id);
    if (!habit) return next(handleError(response, 'Document not found', 404));
    else {
        habit.name = request.body.name;
        habit.duration = request.body.duration;
        currentUser.save(function(err) {
            if (err) return next(err);
            response.redirect('/habits');
        });
    }
});

// DESTROY
router.delete('/:id', authenticate, function(request, response, next) {
    var habit = currentUser.habits.id(request.params.id);
    if (!habit) return next(handleError(response, 'Document not found', 404));
    var index = currentUser.habits.indexOf(habit);
    currentUser.save(function(err) {
        if(err) return next(err);
        response.redirect('/habits');
    });
});

module.exports = router;

const QuizDashboardRouter = require('express').Router();


QuizDashboardRouter.route('/create')
    .get(require('./editor'))
    .post(require('./create'))

// slug after mains
QuizDashboardRouter.route('/:slug')
    .get(require('./view'))


module.exports = QuizDashboardRouter;
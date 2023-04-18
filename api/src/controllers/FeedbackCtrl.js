const ApiError = require('../helpers/ApiError');

const { Feedback } = require('../../models');
const { error } = require('../constante');

const FeedbackCtrl = {
    async createFeedback({
        email, subject, rating, message,
    }) {
        const created = await Feedback.create({
            email,
            subject,
            rating: parseInt(rating, 10),
            message,
        });
        if (!created) throw new ApiError(error.feedback.UNSAVED);
        return true;
    },
};

module.exports = FeedbackCtrl;

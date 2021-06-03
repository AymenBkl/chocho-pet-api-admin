const mongoose = require('mongoose');

module.exports.validators = {
    badgeValidator : (schema) => {
        schema.path('badge').validate(async (value) => {
            const badgeCount = await mongoose.models.badge.countDocuments({name: value });
            return !badgeCount;
          }, 'Badge already exists');
    },

}
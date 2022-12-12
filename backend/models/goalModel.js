const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: { // This is the user who created the goal
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        unique: true,
        required: [true, 'Please add some text'],
        trim: true,
        maxlength: [40, 'Text cannot be more than 40 characters'],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);
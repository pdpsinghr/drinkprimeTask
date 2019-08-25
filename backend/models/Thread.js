const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    username: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
      type: String,
      required: true
    }
});

const Thread = mongoose.model('threads', ThreadSchema);

module.exports = Thread;

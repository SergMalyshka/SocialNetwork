const {Schema, model} = require('mongoose')

function toUtc(date) {
    return date.toUTCString()
}

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => toUtc(createdAtVal)
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    reactoins: [ReactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})
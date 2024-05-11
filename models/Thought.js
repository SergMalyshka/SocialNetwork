const { Schema, model, Types } = require('mongoose')

function toUtc(date) {
    return date.toUTCString()
}


const ReactionSchema = new Schema({
    reactoinId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => toUtc(createdAtVal)
    }
},
    {
        toJSON: {
            getters: true
        }
    })

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
        ref: 'user'
    },
    reactoins: [ReactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactoins.length;
})

const Thought = model('Thought', thoughtSchema)




module.exports = Thought;
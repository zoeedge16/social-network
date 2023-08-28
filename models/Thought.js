const { Schema, model } = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            require: true,
            max: 280,
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function() {
                return this.createdAt.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric' 
                })
            }
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function() {
                return this.createdAt.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                })
            }
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return `Reactions: ${this.reactions.length}`
    })


const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;
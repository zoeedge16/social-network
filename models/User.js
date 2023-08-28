const { Schema, model } = require('mongoose')
const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const userSchema = new Schema(
    {
        username: { 
            type: String, 
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: emailRegEx
        },
        // Need to make this model still
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts'
            }
        ],
        // Need to make this model still
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'friends'
            }
        ]
        

    },
    {
        toJSON: {
            virtual: true,
        },
        id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;
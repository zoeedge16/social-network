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
        
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
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

userSchema
    .virtual('friendCount')
    .get(function() {
        return `Friends list: ${this.friends.length}`
    })

const User = model('user', userSchema);

module.exports = User;
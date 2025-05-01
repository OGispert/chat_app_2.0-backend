const { Schema, model, SchemaTypes } = require('mongoose');


const MessageSchema = Schema({
    from: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },

    to: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },

    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

MessageSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return object;
})

module.exports = model('Message', MessageSchema);
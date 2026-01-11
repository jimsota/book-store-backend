const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    address: {
        City: {
            type: String,
            required: true
        },
        country: String,
        state: String,
        zipcode: String
    },
    Phone: {
        type: Number,
        required: true
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order

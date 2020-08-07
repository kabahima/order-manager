const mongoose = require('mongoose');
const { objectId } = mongoose.Schema;

const categorySchema = new mongoose.Schema(
    {
        Cname : {
        type: String,
        trim:true,
        required: true,
        unique:true ,
        maxlength:32
        },
        unit: {
            required:true,
            type: String,
            unique: true,
            maxlength:10
        }
    },
    {
        timestamps:true
    }
);
const Category = mongoose.model("Category" , categorySchema);
const productSchema = new mongoose.Schema(
    {
        pname:{
            type:String,
            trim: true,
            required:true,
            maxlength:32
        },
        description: {
            type:String,
            required:true,
            maxlength: 2000
        },
        price:{
            type:Number,
            trim:true,
            required: true,
            maxlength:32
        },
        category:{
            type:objectId,
            ref:"Category",
            required:true
        },
        quantity:{
            type: Number
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            data:Buffer,
            contentType:String
        },

        Shipping: {
            required:false,
            type: Boolean
        }
    },
    { timestamps: true }
);
const Product = mongoose.model("Product" , productSchema);

module.exports = { Category, Product };



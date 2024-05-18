const mongoose = require('mongoose');
const Category =require("../models/category");
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        default: function () {
            return this._id.toString();
    }
    },
    description:{
        type:String,
        required:true,
    },
    richDescription:{
        type:String,
        default:'',
    },
    image:{
        type:String,
        default:'',
    },
    images:[{
        type:String,
    }],
    brand:{
        type:String,
        default:'',
    },
    price:{
        type:Number,
        default:0,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255,
    },
    rating:{
        type:Number,
        default:0,
    },
    numReviews:{
        type:Number,
        default:0,
    },
    isFeatured:{  //this product shoud be displayed in the homepage or not
        type:Boolean,
        default:false,
    },
    dateCreated:{
        type:Date,
        default:Date.now,
    },
})

const Product = mongoose.model("product",productSchema);
module.exports = Product;
const mongoose = require('mongoose')
const productCategorySchema = new mongoose.Schema({

name:{type:String},
product:[{type:mongoose.Types.ObjectId,ref:'Product'}],
image:{type:String}

},{timestamps:true})


module.exports = mongoose.model('ProductCategory',productCategorySchema)
const User = require('../../../models/User')
const getCustomerList = async(req,res,next)=>{

    try {
        
        const list = await User.find({role:'customer'}).select('-product')

        res.status(200).json({message:'success',status:true,list})

    } catch (error) {
        next(error)
    }



}

module.exports = getCustomerList
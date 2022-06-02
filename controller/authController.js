const User = require("../models/userModels");
const bcrypt = require("bcryptjs");



exports.singUp = async(req,res,next) =>{
    
    const {username,password}=req.body;
    const hashPassword = await bcrypt.hash(password,12);
    try {
        
        const newUser = await User.create({username,password:hashPassword});
        req.session.user = newUser;
       return res.status(200).json({
           status:"succes",
           data:{
               user:newUser
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:"fail"
        });
    }
    
}

exports.singIn = async(req,res,next) =>{

    const {username,password}=req.body;

    try {
        
        const user = await User.findOne({username});

        if (!user) {
          res.status(403).json({
                status:'fail',
                message:'user not found',
            })
        }
        const checkPassword = await bcrypt.compare(password,user.password)

        if (checkPassword) {
            req.session.user = user;
            return res.status(200).json({
                status:"succes",
                data:{
                    user
                 }
             })

            }else{
            res.status(404).json({
                status:'fail',
                message:'password not match',
            })
        }
       
        
    } catch (error) {
        res.status(400).json({
            status:"fail"
        });
    }

}
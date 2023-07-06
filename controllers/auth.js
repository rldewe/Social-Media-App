import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User.js"

/**Registe User */
export const register=async(req,res)=>{
    try{
        const{
            firstname,
            lastName,
            email,
            password,
            picturePath,
            friends,
            locations,
            occupation
        }= req.body;

        const salt=await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);

        const newUser=new User({
            firstname,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            locations,
            occupation,
            viewedProfile:Math.floor(Math.random()*100),
            impressions:Math.floor(Math.random()*100),
        })
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);
    } 
    catch(err){
            res.status(500).json({error:err.message});
    }
}

/**login */
export const login=async(req,res)=>{
    try{

        const{email ,password}=req.body;
        const user =await User.findOne({email:email});

        if(!user) return res.status(400).json({msg:"User does not exist"});

        const aMatch=await bcrypt.compare(password,user.password);
        if(!aMatch) res.status(400).json({msg:"Invalid"});

        const token=jwt.sign({id:user_id}  ,process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({tojen,user});


    }
    catch(err){
        res.status(500).json({error:err.message});

    }
}
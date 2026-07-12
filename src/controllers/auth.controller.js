const userModel = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
    const { username, email, password, role = "user" } = req.body;

    try {
        const userExist = await userModel.findOne({
            $or: [
                {username},
                {email}
            ]
        })

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        if (userExist)
        {
            return res.status(409).json({ message: "User already Exists" });
        }

        const hashPassword =await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,email,password:hashPassword,role
        })

        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET
        )

        res.cookie("token", token);
        res.status(201).json({
            message: "User created Successfully",
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
            }
         });


        
    } catch (e)
    {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
    
}

const loginUser = async(req, res) =>{
    const { username, email, password } = req.body;

    try {
        const user = await userModel.findOne({
            $or: [
                { username },
                {email}
            ]
        })

        if (!user)
        {
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }

        const isvalid = await bcrypt.compare(password, user.password);

        if (!isvalid)
        {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        
        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET
        )

        res.cookie("token", token);
        
        res.status(201).json({
            message: "User Login Successfully",
            user: {
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
            
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

}


const logoutUser = async (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        message: "Logged out successfully",
    });
};
module.exports = { userRegister, loginUser, logoutUser };
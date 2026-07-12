const jwt = require("jsonwebtoken");


const validUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
                return res.status(401).json({
                    message: "Unauthorized. Token not found."
                });
            }
        
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
        
                if (decode.role !== "artist" && decode.role !== "user")
                {
                    return res.status(403).json({
                        message:"Forbidden"
                    })
                }
                next();
            }
            catch (e) {
                return res.status(401).json({
                    message: "Invalid or expired token"
                });
            }


}

module.exports = validUser;
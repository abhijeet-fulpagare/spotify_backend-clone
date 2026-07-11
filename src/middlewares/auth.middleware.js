const jwt = require("jsonwebtoken");

const ckeckUserRole = async (req, res, next) => {
    const token = req.cookies.token;
       
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized. Token not found."
            });
        }
    
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
    
            if (decode.role !== "artist")
            {
                return res.status(403).json({
                    message:"Forbidden"
                })
            }
            req.user = decode;
            next();
        }
        catch (e) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
}

module.exports = ckeckUserRole;
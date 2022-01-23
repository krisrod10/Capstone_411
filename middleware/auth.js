const jwt = require("jsonwebtoken");
require("dotenv").config();

//middleware to call when processing the authorized url
let checkJWT = (req, res, next) => {
    console.log("Processing JWT check");


    // read the token
    let token;
    if(req.headers.authorization){
        let bearer = req.headers.authorization.split(' ');
        token = bearer[1];
    } else{
        token = null;
    }

    if(!token){
        return res.status(401).send("Unauthorized");
    }

    // veridy the token
    let jwtSecret = process.env.jwtSecret;
    jwt.verify(token, jwtSecret, (error, decoded) => {
        if(error){
            console.log("Could not verify", error);
            return res.status(401).send("Unauthorized");
        }

        // the token is valid store the username from the token
        // in the request so that it is avaliable to all following this call
        console.log(decoded);
        req.username = decoded.username;
        req.isAdmin = decoded.role == 'admin';
        // call the next middleware function in the chain
        next();
    });
}

module.exports ={checkJWT}
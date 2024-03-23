//When at any operation login required this middleware function will run.This function ensure that the request coming from the user is valid or not and if the user is valid then get theinformation of user and save it on req object
const jwt = require('jsonwebtoken');
const jwtsecret = "mynameisShouryaSinha";
const fetchuser=(req,res,next)=>{
//get the user from jwt token and add id to req  object

const token=req.header('auth-token'); //here we give the token in header in thunder clint in header section one side we write auth-token and another side the real token form there it will give the auth token


if(!token){  //if token is not found not present 
    res.status(401).send({error:"Please authenticate using valid token1"})
}
try {
    const data=jwt.verify(token,jwtsecret);  // here we decode the token we comapare the secret key.which means the secret key present in auth token (at the time of jwt.sign) and secretkey provided (at the time of jwt.vartify) are same or not.If same it will not same the code will go in the catch block and if was same then we store the user information in data. 

    req.user=data.user; // Here we said that taking information from data.user (here data is whole information and user is particular information) and save it on req.user(means save of req object in user field)
    
        next() 
} catch (error) {//if any error in token occur send a bad request.
    res.status(401).send({error:"Please authenticate using valid token"})

}

}

module.exports =fetchuser;
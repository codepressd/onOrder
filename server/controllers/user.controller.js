import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/users';
import Cart from '../models/cart';
import Orders from '../models/orders';
import serverConfig from '../config/database';


function generateToken(user) {
    return jwt.sign(user, serverConfig.secret, { expiresIn: '1hr'});
}

function setUserInfo(request) {

    return{       
        userId: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        parent: request.parent,
        email: request.email,
        isChild: request.isChild,
        childRole: request.childRole,
        profileImage: request.profile.profileImage,
        companyName: request.profile.companyName,
        companyLogo: request.profile.companyLogo,
        userView: request.userView,
        phone: request.profile.phone,
        role: request.role,
        address: request.profile.address,
        city: request.profile.city,
        state: request.profile.state,
        region: request.profile.region
    } 
};

//Check user Token
exports.checkUserToken = function (req, res, next) {
    const {token, userId} = req.body;
    if(!token){
        return res.status(422).json({success: false, message: 'Must have a token, please login!'})
    }
  
    jwt.verify(token.replace(/^JWT\s/, ''), serverConfig.secret, function(err, decoded){
        if(err){

            if(err.name === 'TokenExpiredError'){
                return res.status(422).json({
                    success: false, 
                    expireTime: true, 
                    message: 'Token expired, you need to login again.'
                });
            }
            return res.status(422).json({success: false, message: 'Could not verify token'}) 
        }else{
            User.findOne({_id: decoded.userId})
                .then( (user) => {
                     let userInfo = setUserInfo(user);
                    res.status(201).json({
                                        success: true,
                                        token: 'JWT ' + generateToken(userInfo),
                                        user: userInfo
                                });
                })
              .catch(err => res.status(422).json({err}));
        }
    });

}

//Update User

exports.updateUserInfo = function (req, res, next) {
    
    const { companyName, address, city, state, userId, phone, firstName, lastName, email, profileImage } = req.body.newData;

    User.findOneAndUpdate({
                _id : userId
    }, {$set: {
    "profile.companyName": companyName,
    "profile.address": address, 
    "profile.city": city, 
    "profile.state": state,
     "profile.phone": phone, 
     "profile.firstName": firstName, 
     "profile.lastName" : lastName,
     "profile.email": email,
     "profile.profileImage": profileImage }}, {new: true}).exec() 
    .then(function(user){
            let userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
    })
    .catch(err => res.status(422).json({err}));
};

//Change Password

exports.changePassword = function (req, res, next) {

    const {  oldPassword,  newPassword, confirmPassword, userId } = req.body;

    User.findOne({ _id : userId }).exec() 
    .then(function(user){
            const validPass = user.validPassword(oldPassword);
            
            if(!validPass){
                res.status(422).json({
                    passwordError: 'Incorrect Password'
                })
            }

            if( validPass  && newPassword === confirmPassword) {

               user.password = newPassword;
             
               user.save(function(err){
                        if(err){
                            throw err;
                        }else{
                            let userInfo = setUserInfo(user);
           
                            res.status(201).json({
                                success: true,
                                token: 'JWT ' + generateToken(userInfo),
                                user: userInfo
                            });
                        }
               });
            }
            
    })
    .catch(err => res.status(422).json({err}));
};

//login route

exports.login = function(req, res, next) {
    let email = req.body.email;
    let pass = req.body.password;
    //let userInfo = setUserInfo(req.user);

    User.findOne({ email: email }, function(err, user) {
        if (err) {
            return next(err);
        }

        // If user is not found return error
        if (!user) {
            return res.status(422).send({ email: 'Can\'t find that email' });
        }

        const validPass = user.validPassword(pass);

        if (!validPass) {
            return res.status(422).send({ password: 'Incorrect Password' })

        }
        if (validPass) {
            let userInfo = setUserInfo(user);
            res.status(201).json({
                success: true,
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });

        }

    });
}

//register route
exports.register = function(req, res, next) {

    const {email, password, region, businessName, role, isChild, childRole, parentId} = req.body;
    
    let userView = 'restaurant';

    //Create User View
    if(role === 'supplier' ){
        userView = 'supplier';
    }

    // Check for registration errors
    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ email: 'You must enter an email address.' });
    }

    // Return error if Business name not provided
    if (!businessName) {
        return res.status(422).send({ error: 'You must enter your Business Name.' });
    }

    // Return error if full name not provided
    if (!region) {
        return res.status(422).send({ error: 'You must enter your Region Name.' });
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ password: 'You must enter a password.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) {
            return next(err);
        }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ email: 'That email address is already in use.' });
        }

        // If email is unique and password was provided, create account
        let user = new User({
            email: email,
            password: password,
            parent: parentId,
            isChild: isChild,
            profile: {
                firstName: "",
                lastName: "",
                profileImage:"",
                companyName: businessName,
                companyLogo: "",
                address:"",
                phone: "",
                city: "",
                state: "",
                region: region,
                businessType: ""
            },
            role: role,
            childRole: childRole,
            userView: userView
        });

        user.save(function(err, user) {
            if (err) {
                return next(err);
            }
            //initialize cart  for restaurants
                   if(user.role === 'restaurant' || user.role === 'supplier-restaurant'){
                      
                        let cart = new Cart({
                            usersId: user._id
                        });

                        cart.save(function(errs, cart){
                            if (errs) {
                                     return next(errs);
                            }

                        });
                   }
            // Subscribe member to Mailchimp list
            // mailchimp.subscribeToNewsletter(user.email);

            // Respond with JWT if user was created

            let userInfo = setUserInfo(user);

            res.status(201).json({
                success: true,
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
        });
    });
}

//Get Team Members

exports.getTeamMembers = (req, res, next) => {


    User.find({
        parent: req.params.userId
    }, (err, members) =>{
        if(err){
            return next(err);
        }
        res.status(201).json({members: members});
    });

}

//Get Child User Information

exports.childUserInfo = (req, res, next) => {


    User.findOne({
        _id: req.params.userId
    }, function(err, user){
        if(err){
            return next(err);
        }

        res.status(201).json({childUserInfo: user});
    })
}

//Remove Child User

exports.removeChildUser = (req, res, next) => {

    console.log(req.params);

    // User.remove({

    //     _id: req.params.userId

    // }, function(err, product){
    //     if(err){
    //         return next(err);
    //     }
    //     res.status(201).json({message: 'Product Successfully Deleted!'});
    // });
}


//Role Authorization

exports.roleAuthorization = function(role) {
    return function(req, res, next) {
        const user = req.user;

        User.findById(user._id, function(err, foundUser) {
            if (err) {
                res.status(422).json({ error: 'No user was found.' });
                return next(err);
            }

            // If user is found, check role.
            if (foundUser.role == role) {
                return next();
            }

            res.status(401).json({ error: 'You are not authorized to view this content.' });
            return next('Unauthorized');
        })
    }
}

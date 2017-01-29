// config/passport.js
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
//const UserController = require('../controller/users');
const User = require('../models').User;

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, cb) {
        console.log("USER.ID = " + user.fb_id);
        cb(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(obj, done) {
        User.findOne( {where: {id : obj.id} }).then(
            function (user) {
                done(null, user);
            },
            function (err) {
                console.log(err);
                done(err, null);
            }
        );
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'picture.type(large)', 'email', 'first_name', 'last_name']

    },

    // facebook will send back the token and profile
    function(access_token, refreshToken, profile, done) {
        console.log("FACEBOOK PROFILE", profile);
        // asynchronous
        process.nextTick(function() {
            User.findOrCreate({where: {fb_id: profile.id}, 
                defaults: {
                    access_token : 		access_token, // we will save the token that facebook provides to the user	                
	                first_name : 		profile.name.givenName,
	                last_name : 		profile.name.familyName, // look at the passport user profile to see how names are returned
	                email : 			profile.emails[0].value, // facebook can return multiple emails so we'll take the first
	                profilePictureURL : profile.photos[0].value,
                    library: []
                }})
                .spread(function (user, created){
                    done(null, user);
                }).error(function(err){
                    throw(err);
                });

            console.log("SAVING FACEBOOK PROFILE");
			/*User
      			.create({
					fb_id : 			profile.id, // set the users facebook id	                
	                access_token : 		access_token, // we will save the token that facebook provides to the user	                
	                first_name : 		profile.name.givenName,
	                last_name : 		profile.name.familyName, // look at the passport user profile to see how names are returned
	                email : 			profile.emails[0].value, // facebook can return multiple emails so we'll take the first
	                profilePictureURL : profile.photos[0].value,

				})
				.then(user => done(null, user))
				.catch(error => {throw error});*/
            
        });

    }));

};
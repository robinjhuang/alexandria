const express = require('express');
const router = express.Router();

const User = require('../models').User;

router.post('/addAddress', (req, res) => {
    console.log("Trying to save address");
	//console.log(req.user);
	User.findOrCreate({ 
        where: {fb_id: req.user.fb_id }
    })
    .spread(function (user, created){
        user.update({
            address_1: req.body.address,
            city: req.body.city,
            zip: req.body.zip
        });
        res.status(200).json("Success");
    }).error(function(err){
        res.status(500).json(err);
    });
    
});


module.exports = router;
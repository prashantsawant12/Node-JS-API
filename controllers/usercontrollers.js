const User = require('../model/user.js');

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

//Login API
exports.find= (req, res) => {

   /**************************** */

    
   var pass="";
   User.find({'email':req.body.email})
        .then(user => {
            if (!user) {
                return res.status(404).json({Msg:"Envalid Username"});
            }
            pass=cryptr.decrypt(user[0].password);
           
            if(req.body.password==pass)
            {
                return res.status(200).json({Msg:"Valid Login"});
            }
            else
            {
                return res.status(500).json({Msg:"InValid Login"});
            }
        }).catch(err => {
            if (err.kind === 'email') {
                return res.status(404).send({
                    message: "User not found with Email " + req.params.email
                });
            }
            return res.status(500).json({Msg:"Envalid Username"});
        });

/************************************** */

};

//Create new User
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Empty User Data"
        });
    }
/******************************** */
User.find({'email':req.body.email}, function(err, user) {

    if (err) {

        console.log('Signup error');
    }

    //if user found.
    if (user.length!=0) {
      
        console.log('Username already exists, email: ' + req.body.email);        
        res.status(400).json({message:"already Register"})                 
         }else{
               // Create a User
    const user = new User({
        name: req.body.name,
        contact: req.body.contact,
        email: req.body.email,
        password:cryptr.encrypt(req.body.password)
    });

    // Save User in the database
    user.save()
        .then(data => {

            res.status(200).json({message:"Create User Successfully"});
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the User."
            });
        });     
         }                                        
});
};



// Retrieve all products from the database.
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving User."
            });
        });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    User.find({'email':req.params.email})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with Email " + req.params.email
                });
            }
            res.status(200).json(user);
        }).catch(err => {
            if (err.kind === 'email') {
                return res.status(404).send({
                    message: "User not found with Email " + req.params.email
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving User with Email " + req.params.email
            });
        });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }
    // Find and update product with the request body
    User.findByIdAndUpdate(req.params.productId, {
        name: req.body.name,
        contact: req.body.contact,
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.productId
                });
            }
            res.status(200).json(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.productId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send({ message: "Product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
};


/********************************User Encrypt**************************/

 
 const encryptedString ="fcfd3480d098bb13d3866bcfcfff79e00a56d760137e010a1226438aeb92f5f8d388ca3603ae73707e458c19eb0a6b322dd3c9464848e3e4b66d6da421f70cde0240aab91673614afc0cbc4c83013323c62e7a4dc342a07434dc67c57d9a54dbf9316f4ead73";
 const decryptedString = cryptr.decrypt(encryptedString);
 console.log(decryptedString);

/***********************************************************************/
module.exports = (app) => {
    const users = require('../controllers/usercontrollers.js');

    // Create a new Product
    app.post('/user', users.create);

    app.post('/login', users.find);

    // Retrieve all Products
    app.get('/user', users.findAll);

    // Retrieve a single User Data with Email
    app.get('/user/:email', users.findOne);

    //  Update a User with Email
    app.put('/user/:productId', users.update);

    // // Delete a Note with productId
    // app.delete('/products/:productId', products.delete);
}
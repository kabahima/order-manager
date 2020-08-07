const express = require('express');
const router = express.Router();

const {
    create,
    productById,
    read,
    remove,
    update,
    list,
    listCategories,
    photo
} = require('../functions/product');
const {
    requireSignin,
    isAdmin,
    isAuth
} = require('../controllers/auth');

const {
userById
} = require('../functions/user');

router.get('/product/:productId', read);
router.post('/product/create/:userId',requireSignin, isAdmin,isAdmin,create);
router.delete('/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put('/product/:productId/:userId',
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete('/products', list);
router.get("/products/categories", listCategories);
router.get("/product/photo/:productId", photo);
router.param("userId", userById);
router.param("productId", productById);

module.exports = router;



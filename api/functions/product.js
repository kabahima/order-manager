const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/products');
const { errorHandler } = require('../utils/dbErrorHandler');
const product = require('../../../../react-node-ecommerce-master/final-code-with-improvments/ecommerce/models/product');


// find product by Id function
exports.productById = (req, res, next, id ) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) =>{
            if (err || !product)  {
                return res.status(400).json({
                    error: "Product not found"
                });
            }
            req.product = product;
            next();
            });
        
};

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error:"Image could not be uploaded"
            });
        }
        const {
            pname,
            description,
            price,
            category,
            quantity,
            shipping
        } = feilds;
        if (
            !pname ||
            !description ||
            !price ||
            !category ||
            !quantity ||
            !shipping

        ) {
            return res.status(400).json({
                error: "All feilds are required"
            });   
        }
        let product = new Product(fields);
        if (files.photo){
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;

        }
        product.save((err, result) =>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req,res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error:errorHandler(err)
            });
        }
        res.json({
            message: "product deleted successfully"
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err,fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let product = req.product;
        product = _.extend(product, fields);
        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(categories);
    });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json(products);
        });
};

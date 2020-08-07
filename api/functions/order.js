const { Order, CartItem } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");
const order = require("../../../../react-node-ecommerce-master/final-code-with-improvments/ecommerce/models/order");

exports.orderById = (req, res, next, id ) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) =>{
            if(err || !order) {
                return res.status(400).json({
                    error:errorHandler(err)
                });
            }
            req.order =order;
            next();
        });
};
exports.create = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    Order.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error:errorHandler(error)
            });
        }
        res.json(data);
    });
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name address")
        .sort("-created")
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error:errorHandler(error)
                });
            }
            res.json(orders);
        });
};
exports.getStatusValues = (req,res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus =(req, res) => {
    order.update(
        { 
            _id:req.body.orderId
        },
        {
            $set: {
                status:req.body.status
            },
        },
        (err, order) => {
         if (err){
             return res.status(400).json({
                 error:errorHandler(err)
             });
         }      
         res.json(order); 
        }
    );
};
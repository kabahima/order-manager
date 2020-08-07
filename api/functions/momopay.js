// momo api function to process payments 


const momoapi = require('mtn-momo');
require('dotenv').config()

exports.Momo_Sandbox_Credentials = (req,res) = {
    userSecret= process.env.userSecret,
    userId= process.env.userId
  };

exports.processPayment = (req, res) => {
    //  gets payment info from the body
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    // charge
    let newTransaction = Momo_Sandbox_Credentials.collections(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true
            }
        },
        (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }
    );
};
  
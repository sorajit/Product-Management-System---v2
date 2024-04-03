const pool = require("../../db");
const query = require("./queries");
const getProducts = (req,res)=>{
    pool.query(query.getProducts,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};
const getProduct = (req,res)=>{
    pool.query(query.getProduct,[parseInt(req.params.id)],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

const postProduct = (req,res)=>{
    postData = [req.body.name, req.body.category, req.body.price, req.body.stock]
    pool.query(query.postProduct,postData,(error,results)=>{
        if(error) throw error;
        res.status(200).json(postData);
    });
};
const putProduct = (req,res)=>{
    putData = [parseInt(req.params.id),req.body.name, req.body.category, req.body.price, req.body.stock]
    pool.query(query.putProduct,putData,(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};
const deleteProduct = (req,res)=>{
    pool.query(query.delectProduct,[parseInt(req.params.id)],(error,results)=>{
        if(error) throw error;
        res.status(200).send("Deletion was successful");
    });
};


module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct,
}
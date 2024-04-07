const pool = require("../../db");
const query = require("./queries");
const CustomError = require('../../Utils/CustomError')

function checkSubmitValue(name, category, price, stock ) {
    // ตรวจสอบว่าทุกฟิลด์มีการกรอกค่า
    if (!name || !category || !price || !stock) {
      throw new Error('กรุณาระบุค่าทุกฟิลด์ที่จำเป็น')
    }
    // ตรวจสอบประเภททของ input
    const invalidFields = [];
    if (typeof name !== 'string') invalidFields.push('name');
    if (typeof category !== 'string') invalidFields.push('category');
    if (typeof price !== 'number') invalidFields.push('price');
    if (typeof stock !== 'number') invalidFields.push('stock');
  
    if (invalidFields.length > 0) {
      throw new Error(`ประเภทของค่าไม่ถูกต้องสำหรับฟิลด์: ${invalidFields.join(', ')}`)
    }
    // ตรวจสอบค่า price และ stock ต้องมีค่ามากกว่า 0
    if (price <= 0 || stock <= 0) {
      throw new Error ('ราคาและจำนวนสินค้าคงคลังต้องมากกว่า 0');
    }
  
    // ตรวจสอบค่า stock ต้องไม่เป็นทศนิยม
    if (stock.toString().search(/[\.,e]/i) != -1) {
      throw new Error('stock ต้องเป็นจำนวนเต็ม')
    }
  }
const getProducts = (req,res,next)=>{
    pool.query(query.getProducts,(error,results)=>{
        if(error) {
            err = new CustomError(error.message,400);
            next(err);
            return;
        }
        res.status(200).json(results.rows);
    });
};
const getProduct = (req,res,next)=>{
    pool.query(query.getProduct,[parseInt(req.params.id)],(error,results)=>{
        if(error) {
            err = new CustomError(error.message,400);
            next(err);
            return;
        }
        if(results.rows.length == 0) {
            err = new CustomError("ไม่พบสินค้า id : "+parseInt(req.params.id),404);
            next(err);
            return
        }
        res.status(200).json(results.rows[0]);
    });
};

const postProduct = (req,res,next)=>{
    const {name, category, price, stock} = req.body;
    try{
        checkSubmitValue(name, category, price, stock );
    }catch(error){
        err = new CustomError(error.message,400);
            next(err);
            return;
    }
    postData = [name, category, price, stock]
    pool.query(query.postProduct,postData,(error,results)=>{
        if(error) {
            err = new CustomError(error.message,400);
            next(err);
            return;
        }
        res.status(200).json(postData);
    });
};
const putProduct = (req,res,next)=>{
    const {name, category, price, stock} = req.body;
    try{
        checkSubmitValue(name, category, price, stock );
    }catch(error){
        err = new CustomError(error.message,400);
            next(err);
            return;
    }
    putData = [parseInt(req.params.id),name, category, price, stock]
    pool.query(query.putProduct,putData,(error,results)=>{
        if(error) {
            err = new CustomError(error.message,400);
            next(err);
            return;
        }
        res.status(200).json(results.rows);
    });
};
const deleteProduct = (req,res,next)=>{
    pool.query(query.deleteProduct,[parseInt(req.params.id)],(error,results)=>{
        if(error) {
            err = new CustomError(error.message,400);
            next(err);
            return;
        }
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
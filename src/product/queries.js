const getProducts = 'SELECT * FROM product';
const getProduct = 'SELECT * FROM product WHERE product_id = $1';
const postProduct = 'INSERT INTO product (product_name, category, price, stock)  VALUES($1, $2, $3,$4); '
const putProduct = 'UPDATE product SET product_name = $2, category = $3, price = $4, stock = $5 WHERE product_id = $1 RETURNING * '
const delectProduct = 'DELETE FROM product WHERE product_id =$1'

module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    delectProduct,
}


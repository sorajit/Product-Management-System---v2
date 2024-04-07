const express = require("express");
const controller = require("./src/product/controller");
const productRouter = express.Router();
const globalErrorHandler = require('./src/product/errorController')

const app = express();
const port = 3000;

app.use(express.json());

productRouter.route("/").get(controller.getProducts);
productRouter.route("/:id").get(controller.getProduct);
productRouter.route("/").post(controller.postProduct);
productRouter.route("/:id").put(controller.putProduct);
productRouter.route("/:id").delete(controller.deleteProduct);

app.use("/products", productRouter);
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log("Listening on port %d", port);
});

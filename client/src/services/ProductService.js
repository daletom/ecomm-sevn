import axios from "axios"
//import { Http2ServerRequest } from "http2";

export default {
  async getProducts() {
    let res = await axios.get("http://localhost:3001/products");
    return res.data.data;
  },
  async getProductSingle(productID) {
    let res = await axios.get("http://localhost:3001/products/" + productID);
    return res.data.data;
  },
  async findByTitle(title) {
    let res = await axios.get("http://localhost:3001/products/?title=" + title);
    return res.data.data;
  }
}

  //export default new ProductService();
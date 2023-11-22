import axios from "../../configs/axios";

const productService = {
    getProducts() {
        return axios.get("products");
    },

    getProductsByName(name) {
        return axios.get(`search?name=${name}`);
    },

    addToCart(id) {
        return axios.post(`add-to-cart?id=${id}`,);
    },

    substractFromCart(id) {
        return axios.post(`subtract-from-cart?id=${id}`);
    },

    getProductsOnCart() {
        return axios.get("view-cart");
    },
};

export default productService;
import axios from "../../configs/axios";

const productService = {
    getProducts(product) {
        return axios.get(
            "API",
            {
                params: { product },
            }
        );
    },
};

export default productService;
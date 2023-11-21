import axios from "../../configs/axios";

const productService = {
    getProducts() {
        return axios.get(
            "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/products"
        );
    },

    getProductsByName(name) {
        return axios.get(
            "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/search",
            {
                params: { name },
            }
        );
    },

    addToChart(id) {
        return axios.get(
            "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/add-to-cart",
            {
                params: { id },
            }
        );
    },

    getProductsOnChart() {
        return axios.get(
            "https://linkedin-cv-crawler.beta-limited.workers.dev/interview/view-cart"
        );
    },
};

export default productService;
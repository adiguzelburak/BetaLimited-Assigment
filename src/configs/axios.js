import axios from "axios";

const options = {
    headers: {
        "Session-ID": "6rmllpazw",
    },
    baseURL: 'https://linkedin-cv-crawler.beta-limited.workers.dev/interview/'
};

const instance = axios.create(options);

export default instance;
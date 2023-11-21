import axios from "axios";

const options = {
    headers: {
        "Session-ID": "6rmllpazw",
    },
};

const instance = axios.create(options);

export default instance;
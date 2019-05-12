/* Dependencies */ 
const axios = require("axios");

/* App Settings */
const config = {
    // Cloudflare Authentication Settings.
    auth: {
        email: "",
        token: ""
    },
    // Domains to be updated.
    domains: [
        "domain.com",
        "test.com"
    ]
}

/* Axios Config */
/**
 * Function used to create an instance of axios with specified defaults.
 * @function
 * @private
 * @retruns {Object} - The axios instance.
 */
const createAxios = () => {
    const axiosClient = axios.create();
    axiosClient.defaults.baseURL = 'https://api.cloudflare.com/client/v4/';
    axiosClient.defaults.headers.common['X-Auth-Email'] = config.auth.email;
    axiosClient.defaults.headers.common['X-Auth-Key'] = config.auth.token;
    axiosClient.defaults.headers.post['Content-Type'] = 'application/json';
    return axiosClient;
}

/* Exports */
exports.createAxios = createAxios;
exports.config = config;
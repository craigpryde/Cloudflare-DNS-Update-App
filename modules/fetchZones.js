/* Dependencies */
const createAxios = require("../config").createAxios;
const axios = createAxios();

/**
 * Returns all zones for a domain name.
 * @param {Object} param0 - Object containing passed in values.
 * @param {String} param0.domain - The domain name to be used.
 * @returns {Promise} - Returns new promise that when resolved will provide an array of zone id's.
 * @example
 * fetchZones({ domain: "example.com" })
 * .then((zones) => console.log(zones));
 */
const fetchZones = ({ domain }) => {
    return new Promise((resolve, reject) => {
        const request = axios.get(`zones?name=${domain}&status=active&match=all`);
        request.then((response) => {
            resolve(response.data.result.map((currentZone) => currentZone.id));
        });
        request.catch((error) => {
            reject(error);
        });
    });
}

/* Exports */
exports.fetchZones = fetchZones;
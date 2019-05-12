/* Dependencies */
const createAxios = require("../config").createAxios;
const axios = createAxios();

/**
 * Returns all A records for a zone.
 * @function
 * @private
 * @param {Object} param0 - Object containing passed in values.
 * @param {String} param0.domain - The domain name to be used.
 * @returns {Promise} - Returns new promise that when resolved will provide an array of zone id's.
 * @example
 * fetchARecords({ zone: "023e105f4ecef8ad9ca31a8372d0c353" })
 * .then((records) => console.log(records));
 */
const fetchARecords = ({ zone }) => {
    return new Promise((resolve, reject) => {
        const request = axios.get(`zones/${zone}/dns_records?type=A`);
        request.then((response) => {
            resolve(response.data.result);
        });
        request.catch((error) => {
            reject(error);
        });
    });
}

/* Exports */
exports.fetchARecords = fetchARecords;
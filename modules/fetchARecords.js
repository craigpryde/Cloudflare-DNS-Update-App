/* Dependencies */
const createAxios = require("./config").createAxios;

const axios = createAxios();

/**
 * Function used to return all A records for a zone.
 * * @param {Object} param0 - Object containing passed in values.
 * @param {String} param0.domain - The domain name to be used.
 * @return {Promise} - Returns new promise that when resolved will provide an array of zone id's.
 * @example
 * // Fetch Records
 * const getRecords = fetchARecords({ zone: "023e105f4ecef8ad9ca31a8372d0c353" });
 * // Log out records
 * getRecords.then((records) => console.log(records));
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

exports.fetchARecords = fetchARecords;
/* Dependencies */
const createAxios = require("../config").createAxios;
const axios = createAxios();

/**
 * Updates a DNS record.
 * @function
 * @private
 * @param {Object} param0 - Object containing the passed in parameters.
 * @param {String} param0.zone - The DNS zone.
 * @param {String} param0.recordId - Record id. 
 * @param {String} param0.type - Record type. 
 * @param {String} param0.name -  Record name.
 * @param {String} param0.content - The new IPv4 address. 
 * @returns {Promise} - Promise that when resolves contains the cloudflare API response.
 * @example
 * updateDNSRecord({
 *  zone: "023e105f4ecef8ad9ca31a8372d0c353",
 *  recordId: "1",
 *  type: "A",
 *  name: "test.com",
 *  content: "1.0.0.1"
 * })
 * .then((success) => console.log(success));
 */
const updateDNSRecord = ({ zone, recordId, type, name, content }) => {
    return new Promise((resolve, reject) => {
        const request = axios.put(`zones/${zone}/dns_records/${recordId}`, {
            type,
            name,
            content
        });
        request.then((response) => {
            resolve(response.data.success);
        });
        request.catch((error) => {
            reject(error);
        });
    });
}

/* Exports */
exports.updateDNSRecord = updateDNSRecord;
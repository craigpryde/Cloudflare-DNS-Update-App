/* Dependencies */
const publicIp = require('public-ip');

/**
 * Retrieves the IPV4 address of the local network.
 * @function
 * @private
 * @returns {Promise} - Promise resolving with the ip v4 address.
 */
const retrieveIPV4 = () => {
    return new Promise((resolve, reject) => {
        (async function getIP() {
            const ip = await publicIp.v4();
            resolve(ip);
        }());
    });
}

/* Exports */
exports.retrieveIPV4 = retrieveIPV4;
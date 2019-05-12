/* Dependencies */
const publicIp = require('public-ip');

const retrieveIPV4 = () => {
    return new Promise((resolve, reject) => {
        (async function getIP() {
            const ip = await publicIp.v4();
            resolve(ip);
        }());
    });
}

exports.retrieveIPV4 = retrieveIPV4;
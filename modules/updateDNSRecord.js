/* Dependencies */
const createAxios = require("../config").createAxios;

const axios = createAxios();

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

exports.updateDNSRecord = updateDNSRecord;
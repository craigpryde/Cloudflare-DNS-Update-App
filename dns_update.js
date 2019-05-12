/* Dependencies */
const domains = require("./config").config.domains;
const retrieveIPV4 = require("./helpers/retrieveIPV4").retrieveIPV4;
const fetchARecords = require("./modules/fetchARecords").fetchARecords;
const fetchZones = require("./modules/fetchZones").fetchZones;
const updateDNSRecord = require("./modules/updateDNSRecord").updateDNSRecord;

/** 
 * Function used to handle updating DNS A Records on cloudflare for specified domains.
 * @function
 * @example
 * // Fetch's Local IPV4
 * // -> Loops through domains.
 * // -> Retrieves Zones
 * // -> Fetches A Records
 * // -> Updates Record If Required.
 */
const dnsUpdate = () => {
    retrieveIPV4()
    .then((ip) => {

        domains.forEach((currentDomain) => {

            fetchZones({ domain: currentDomain })
            .then((domainZones) => {

                domainZones.forEach((currentZone) => {

                    fetchARecords({ zone: currentZone })
                    .then((records) => {

                        records.forEach((currentRecord) => {

                            if(currentRecord.content !== ip) {
                                updateDNSRecord({ 
                                    zone: currentZone, 
                                    recordId: currentRecord.id,
                                    type: currentRecord.type,
                                    name: currentRecord.name,
                                    content: ip
                                })
                                .then((success) => {
                                    if(!success) {
                                        console.log("An Error occured updating the DNS record.");
                                    }
                                    else {
                                        console.log("Updated record", currentRecord.name);
                                    }
                                })
                                .catch((error) => console.log(error));                      
                            }

                        });

                    })
                    .catch((error) => console.log(error));

                });

            })
            .catch((error) => console.log(error));
        });

    });
}

dnsUpdate();




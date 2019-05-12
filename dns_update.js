/* Dependencies */
const domains = require("./config").config.domains;
const retrieveIPV4 = require("./helpers/retrieveIPV4").retrieveIPV4;
const fetchARecords = require("./modules/fetchARecords").fetchARecords;
const fetchZones = require("./modules/fetchZones").fetchZones;
const updateDNSRecord = require("./modules/updateDNSRecord").updateDNSRecord;



retrieveIPV4()
.then((ip) => {
    console.log("HIT", domains);
    domains.forEach((currentDomain) => {

        fetchZones({ domain: currentDomain })
        .then((domainZones) => {

            console.log(domainZones);

            domainZones.forEach((currentZone) => {

            console.log(currentZone);


                fetchARecords({ zone: currentZone })
                .then((records) => {

                    console.log(records);

                    records.forEach((currentRecord) => {

                        if(currentRecord.content !== ip) {
                             // Update the DNS
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





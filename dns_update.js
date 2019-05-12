/* Dependencies */
const domains = require("./config").config.domains;
const retrieveIPV4 = require("./helpers/retrieveIPV4").retrieveIPV4;

const fetchARecords = require("./modules/fetchARecords").fetchARecords;
const fetchZones = require("./modules/fetchZones").fetchZones;
const updateDNSRecord = require("./modules/updateDNSRecord").updateDNSRecord;



retrieveIPV4()
.then((ip) => {


});




// Update the domains
(async function() {

    domains.forEach((currentDomain) => {

        // Get the zones for the current domain
        fetchZones({ domain: currentDomain })
        .catch((error) => console.log(error))
        .then((domainZones) => {
            
            // Loop through zones
            domainZones.forEach((currentZone) => {
                
                // Get the A records
                fetchARecords({ zone: currentZone })
                .catch((error) => console.log(error))
                .then((records) => {
                    
                    // Loop through the records
                    records.forEach((currentRecord) => {
                        
                        // If the IP has changed
                        if(currentRecord.content !== ip) {
                            // Update the DNS
                            updateDNSRecord({ 
                                zone: currentZone, 
                                recordId: currentRecord.id,
                                type: currentRecord.type,
                                name: currentRecord.name,
                                content: ip
                            })
                            .catch((error) => console.log(error))
                            .then((success) => {
                                if(!success) {
                                    console.log("An Error occured updating the DNS record.");
                                }
                                else {
                                    console.log("Updated record", currentRecord.name);
                                }
                            });                            
                        }
                    });             
                });
    
            });
        });
    
    });


})();


# Cloudflare DNS Update App
App developed to be used with the linux cron to sync A records of domains with a non-static IP. Combat's the DDNS issue's with ISP's.

**Requirments**
* Cloudflare
* Git
* Node JS v10+
* NPM v6+

Tested on the above spec's, Although the screipt should work with older versions of node. 

---
## Quickstart
### Initial Setup
1. Create a location on the server to house the app, for the tutorial we will use "/scripts".
    ```
        sudo mkdir /scripts
    ```

2. Clone or copy the files for the app into the directory.
    ```
        cd /scripts
        sudo git clone https://github.com/craigpryde/Cloudflare-DNS-Update-App.git
    ```

3. Create the config file:
    ```
        sudo cp config.sample.js config.js
    ```

4. Open the config file and add the required authentication settings and domains to be updated. 
Help: [Where To find API Token](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-)
    ```
        sudo nano config.js

        // Add Auth
        auth: {
            email: {{ Email associated with cloudflare account}},
            token: {{ Cloudflare API Token }}
        }

        // Add Domains
        domains: {{ Array of domain names to be synced, e.g. ["domain.test", "test.test"] }}
    ```

5. Save and close file
    ```
        ctrl+x
        y
    ```

6. Install Dependencies
    ```
        sudo npm install
    ```

7. Test DNS Update
    ```
        // Got to cloudflare and edit one of your domains A name records to 1.1.1.1.

        // Then lets run the script:
        sudo node ./dns_update.js
    ```

    You should now see output similar to the below:
    ```
        Updated record domian.test
    ```
###

### Set as Cron Job 
Now lets run the app every 15 minutes in the background as a cron task.

1. Open the crontab as sudo
    ```
        sudo crontab -e

        // Open in nano
        2
    ```

2. Set the script to run with node every 15 mins
```
    */15 * * * * /usr/bin/node /scripts/Cloudflare-DNS-Update-App/dns_update.js
```

3. Check the script is working.
Update one of your domains inside of cloudflare to point to 1.1.1.1, Wait 15 mins and refresh the page. You should see the domain record changed to match the IP v4 of the server.
_

4. Thats it, You now have a script that runs every 15 minutes and will update the domains A name records to match the servers IP v4 address.

---
## Requirements Install
**Install Git**
```
    sudo apt-get update && sudo apt-get install git
```
once installed you can verify with "git --version".

**Install Node & NPM**
```
    sudo apt-get update && sudo apt-get install nodejs && sudo apt-get install npm
```
once installed you can verify with "npm -v && node -v".

---
Help
**NPM Returns Error: Method Not Allowed on npm install**
This is a known issue within some versions of NPM which causes the installer to hit a 405. Update the version of NPM on the server to fix this:
```
    sudo npm install -g npm
```
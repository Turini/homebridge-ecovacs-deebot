const sucks = require('sucks')
	, EcoVacsAPI = sucks.EcoVacsAPI
    , VacBot = sucks.VacBot
    , nodeMachineId = require('node-machine-id')
    ;

// You need to provide a device ID uniquely identifying the
// machine you're using to connect, the country you're in
// (which you can for example retrieve from http://ipinfo.io/json).
// The module exports a countries object which contains a mapping 
// between country codes and continent codes. If it doesn't appear
// to work for your continent, try "ww", their world-wide catchall.

let account_id = "rdrg.turini@gmail.com"
	, password = "200288"
	, password_hash = EcoVacsAPI.md5(password)
	, device_id = EcoVacsAPI.md5(nodeMachineId.machineIdSync())
	, country = "us"
	, continent = "na";

let api = new EcoVacsAPI(device_id, country, continent);

// The account_id is your Ecovacs username.
// The password_hash is an md5 hash of your Ecovacs password.
api.connect(account_id, password_hash).then(() => {
    console.log("Connected!");
    
    api.devices().then((devices) => {
        let vacuum = devices[0];
        let vacbot = new VacBot(api.uid, EcoVacsAPI.REALM, api.resource, api.user_access_token, vacuum, continent);
        vacbot.on("ready", (event) => {
            // vacbot.run("batterystate");
            vacbot.run("clean");
            setTimeout(() => {
                vacbot.run("stop");
                vacbot.run("charge");
            }, 60000);
            
            vacbot.on("BatteryInfo", (battery) => {
                console.log("Battery level: %d\%", Math.round(battery*100));
            });
        });
        vacbot.connect_and_wait_until_ready();
    });
}).catch((e) => {
	// The Ecovacs API endpoint is not very stable, so
	// connecting fails randomly from time to time
	console.error("Failure in connecting!");
});
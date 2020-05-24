"use strict";
const settings_1 = require("./settings");
const platform_1 = require("./platform");
const sucks_1 = require("sucks");
/**
 * This method registers the platform with Homebridge
 */
const EcoVacsAPI = sucks_1.sucks.EcoVacsAPI;
const VacBot = sucks_1.sucks.VacBot;
module.exports = (api) => {
    api.registerPlatform(settings_1.PLATFORM_NAME, platform_1.ExampleHomebridgePlatform);
};
//# sourceMappingURL=index.js.map
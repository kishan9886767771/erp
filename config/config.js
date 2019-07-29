var config_json = require('./config.json');
var appName = config_json.appName;
appName = appName.toUpperCase();
var logoURL = config_json.logoURL;
var favIcon = config_json.favIcon;
var initConfig = config_json.initConfig;

module.exports = {
    appName: appName,
    logoURL: logoURL,
    favIcon: favIcon,
    initConfig: initConfig
}
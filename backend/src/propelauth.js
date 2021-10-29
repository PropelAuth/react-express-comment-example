const propelAuth = require("@propelauth/express")

module.exports = propelAuth.initAuth({
    authUrl: "REPLACE_ME",
    apiKey: "REPLACE_ME",
})

import config from "react-global-configuration";

config.set({
    api_host: process.env.REACT_APP_API_HOSTNAME,
    api_port: process.env.REACT_APP_API_PORT,
})

console.log(config.get('api_host'))
console.log(config.get('api_port'))
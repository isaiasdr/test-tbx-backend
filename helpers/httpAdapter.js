const axios = require("axios");


class HttpAdapter {

    async get ( url, options = {} ) {
        const { data } = await axios.get( url, options );

        return data;
    }
}

const http = new HttpAdapter();

module.exports = {
    http,
}
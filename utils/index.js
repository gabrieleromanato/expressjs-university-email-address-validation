'use strict';

const superagent = require('superagent');

module.exports = {
    apiRequest( country = 'italy' ) {
        const url = `http://universities.hipolabs.com/search?country=${country}`;
        return superagent.get(url);
    },
    isUniDomain(data, domain) {
        const result = data.find(element => { return element.domains.includes(domain); });
        return result ? true : false;
    }
};
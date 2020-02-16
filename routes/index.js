'use strict';

const path = require('path');
const express = require('express');
const ABSPATH = path.dirname(process.mainModule.filename) + '/';
const router = express.Router();
const { apiRequest, isUniDomain } = require('../utils');
const validator = require('validator');

router.get('/', (req, res, next) => {
    res.sendFile(ABSPATH + 'views/index.html');
});

router.post('/validate', async (req, res, next) => {
    const { email } = req.body;
    let valid = true;

    if(!validator.isEmail(email)) {
        valid = false;
        res.json({ valid });
        return;
    }

    const parts = email.split('@');
    const domainParts = parts[1].split('.');
    const domain = domainParts[domainParts.length - 2] + '.' + domainParts[domainParts.length - 1];

    try {
        const response = await apiRequest();
        const data = JSON.parse(response.text);
        valid = isUniDomain(data, domain);
        res.json({ valid });
    } catch(err) {
        res.json({ err });
    }
});

module.exports = router;
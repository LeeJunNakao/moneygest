require('./database');

const express = require('express');
const protectedAPI = require('./src/config/routes/protectedRoutes');
const openAPI = require('./src/config/routes/openRoutes')
const server = require('./src/config/server');

protectedAPI(server,express);
openAPI(server,express)













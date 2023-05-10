'use strict';

const axios = require("axios");
require('dotenv').config();

axios.get(`${process.env.TOKEN_SERVICE_API_SERVER}/users/vot`).then(resp => {
   console.log(resp.data.visitorToken);
});

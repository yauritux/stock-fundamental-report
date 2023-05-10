'use strict';

const axios = require("axios");
require('dotenv').config();

axios.post(`${process.env.TOKEN_SERVICE_API_SERVER}/users/vot`).then(resp => {
   console.log(resp.data.visitorToken);
});

'use strict';

const axios = require('axios');

const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=<put your api key here>';

axios(url).then(response => {
   const data = response.data;
   const title = data['Meta Data']['1. Information'];
   const company = data['Meta Data']['2. Symbol'];
   const latestUpdate = data['Meta Data']['3. Last Refreshed'];
   const timezone = data['Meta Data']['4. Time Zone'];
   console.log('Report Title:', title);
   console.log('Company:', company);
   console.log('Updated On:', latestUpdate);
   console.log('Timezone:', timezone);
   const map = data['Monthly Time Series'];

   const records = Object.entries(map);
 
   console.log('\n');
   let i = 0;
   records.map(function(data) {
     console.log('-----------------------------------');
     console.log('Date  :', records[i][0]);
     console.log('-----------------------------------');
     console.log('Open  :', records[i][1]['1. open']);
     console.log('High  :', records[i][1]['2. high']);
     console.log('Low   :', records[i][1]['3. low']);
     console.log('Close :', records[i][1]['4. close']);
     console.log('Volume:', records[i][1]['5. volume']);
     console.log('\n');
     i++;
   });
});


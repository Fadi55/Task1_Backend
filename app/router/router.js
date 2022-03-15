
const cors = require('cors');

const express = require('express');
 
const app = express();
 
 

module.exports = function (app) {

   app.use(cors());
   app.options('*', cors());
 
const exchange = require('../controller/exchange');
 

app.get('/Exponentiamoving', exchange.Exponentiamoving);
   //daysworks
   app.get('/exchangeData', exchange.getExchange);
   

}
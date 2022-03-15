var express = require('express');
const cors = require("cors")
const db = require('../config/db.config.js');
const { tables } = require('../config/db.config.js');
const https = require('https');
const axios = require('axios');
const ExchangeMD = require('../models/ExchangeMD.js');
const EXchangesS = db.exChangeMD;
var moment = require('moment');
 ArrExs=[]

//get Restaurant with workers
exports.getExchange = (req, res) => {
 
    
    axios.get('https://openexchangerates.org/api/latest.json?app_id=4aec39e75069487c8a6205688fd0c9df')
    .then(response => {
        var ArryEx=[]
      var EURs
      var GBPs
      var Bases
      var dateEx
          ArryEx.push(response.data)
          ArryEx.forEach((value) => {
            EURs=value.rates.EUR
            GBPs=value.rates.GBP
            Bases=value.base
            dateEx=  moment.unix(value.timestamp).format("YYYY-MM-DD HH:mm:ss")
              })
              const datas = {
                EUR: EURs,
                GBP: GBPs,
                Base:Bases,
                dateExchnage:  dateEx
            }
            EXchangesS.create(datas)
              .then(datas => {
      
                  if (datas) {
                      res.send(datas)
      
                  } else {
                      res.send('datas dont create ')
      
                  }
              }).catch(err => {
                  res.send('errror: ')
      
              })

            
    })
    .catch(error => {
      console.log(error);
    });
 
}
 

exports.Exponentiamoving  = (req, res) => {
 ExchEUR=[]
 ExchGBP=[]
      mRange=7
    return EXchangesS.findAll()
        .then(turnover => {

            turnover.forEach((value) => {
                ExchEUR.push(value.EUR)
                ExchGBP.push(value.GBP)
            })
           
            console.log("sss",ExchEUR)
            var averageEUR = caculateMovingAverage(ExchEUR, 7)
            var averageGBP = caculateMovingAverage(ExchGBP, 7)
for (var i = 0; i < averageEUR.length; ++i) {
	console.log("averageEUR",averageEUR[i]);
}
for (var i = 0; i < averageGBP.length; ++i) {
	console.log("averageGBP",averageGBP[i]);
}

          mmEUR=  EMACalc(ExchEUR,mRange)
          mmGBP=  EMACalc(averageGBP,mRange)
 data={"moving average  EUR":averageEUR,"moving average  GBP":averageGBP,
 "exponential moving average  EUR":mmEUR,"exponential moving average  GBP":mmGBP

}
          res.send(data)
               
        }).catch(err => {
            res.send('errror: ' + err)
        })
 
}
 
function EMACalc(mArray,mRange) {
    console.log("mRangemRange",mArray)
    console.log("mRangemRange",mRange)
    var k = 2/(mRange + 1);
    // first item is just the same as the first item in the input
    emaArray = [mArray[0]];
    // for the rest of the items, they are computed with the previous one
    for (var i = 1; i < mArray.length; i++) {
      emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
    }
   
    return emaArray;
  }

  function caculateMovingAverage(data, window) {
    var result = [ ];
    if (data.length < window) {
      return result;
  }
  var sum = 0;
  for (var i = 0; i < window; ++i) {
        sum += data[i];
  }
  result.push(sum / window);
    var steps = data.length - window - 1;
  for (var i = 0; i < steps; ++i) {
        sum -= data[i];
      sum += data[i + window];
      result.push(sum / window);
  }
    return result;
}

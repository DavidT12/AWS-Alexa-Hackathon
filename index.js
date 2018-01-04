/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';

var http = require("http");
const https = require('https');

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {


    'en-GB': {
        translation: {
            FACTS: [
                "As of January 2015, there were over 500 different types of cryptocurrencies – or altcoins – for trade in online markets.",
                "As of September 2017, there were over 1,100 cryptocurrencies and the total market capitalization of all cryptocurrencies reached an all-time high surpassing $60 billion!",
                "Every day produces about 3,600 new Bitcoins.",
                "The first transfer Bitcoin transaction took place on January 21, 2009. ",
                "The maximum amount of Bitcoins that will be produced - 21 million coins. Today already produced about 12 million bitcoins. ",
                "Only 36% of the total volume of coins produced have been observed in any transaction. The remaining 64% of the coins after his appearance were never used.",
                "A resident of the UK named James Houels inadvertently threw a hard drive with a key from the wallet, which was (and probably still is) 7500 Bitcoins. It is about 5 million dollars at the current rate.",
                "When the pressure states cut off WikiLeaks donations via bank transfer, the site instantly switched to receive donations in Bitcoins.",
                "The guy from Norway named Christopher Koch, bought the Bitcoins in the year 2009 at $ 27 and forgotten about them, and when he remembered, his investment has risen to 886 thousand dollars.",
                "The first Bitcoin-ATM was installed in the Canadian city of Vancouver.",
                "Thailand was the first country in the world to ban Bitcoin (but allowed back).",
                "927 people own 50% of all Bitcoin.",
                "The cryptocurrency industry currently employs more than 1,876 people."
            ],
            SKILL_NAME: 'Crypto Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
    
        },
    },

};



const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random crypto fact from the crypto facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    
    'BitcoinValueIntent': function () {
         this.emit('GetBitcoinValue');
    },
    
    'GetBitcoinValue': function () {
        //http://api.coindesk.com//v1/bpi/currentprice/EUR.json
        var options = {
          host: 'api.coindesk.com',
          port: 80,
          method: 'GET',
          path: '/v1/bpi/currentprice/EUR.json'
        };

        var req = http.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
        returnData = returnData + chunk;
        });

            res.on('end', () => {
            var result = JSON.parse(returnData);
            var btcValueRounded = parseFloat(`${result.bpi.EUR.rate_float}`).toFixed(2);
            
            this.response.speak(`The value of bitcoin in ${result.bpi.EUR.description} as of ${result.time.updateduk} is ${btcValueRounded}`);
            this.emit(':responseReady');
        });

    });
    req.end();
        
    },
    
    'DogecoinValueIntent': function () {
         this.emit('GetDogecoinValue');
         
    },
    
    'GetDogecoinValue': function () {
        //https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=EUR
        var options = {
          host: 'min-api.cryptocompare.com',
          port: 443,
          method: 'GET',
          path: '/data/price?fsym=DOGE&tsyms=EUR'
        };

        var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
        returnData = returnData + chunk;
        });

            res.on('end', () => {
            if(returnData!=null){    
                var result = JSON.parse(returnData);
                var ValueRounded = parseFloat(`${result.EUR}`).toFixed(2);
                this.response.speak(`The value of Dogecoin in euro is ${ValueRounded}  `);
                this.emit(':responseReady');
           } 
        });

    });
    req.end();
    },
    
    
    'EthcoinValueIntent': function () {
         this.emit('GetEthcoinValue'); 
    },
    
    'GetEthcoinValue': function () {
        //https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR
        var options = {
          host: 'min-api.cryptocompare.com',
          port: 443,
          method: 'GET',
          path: '/data/price?fsym=ETH&tsyms=EUR'
        };

        var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
        returnData = returnData + chunk;
        });

            res.on('end', () => {
            if(returnData!=null){    
                var result = JSON.parse(returnData);
                var ValueRounded = parseFloat(`${result.EUR}`).toFixed(2);
                this.response.speak(`The value of Ethcoin in euro is ${ValueRounded}  `);
                this.emit(':responseReady');
           } 
        });
    });
    req.end();
    },
    
    
    'IotcoinValueIntent': function () {
         this.emit('GetIotcoinValue'); 
    },
    
    'GetIotcoinValue': function () {
        //https://min-api.cryptocompare.com/data/price?fsym=IOT&tsyms=EUR 
        var options = {
          host: 'min-api.cryptocompare.com',
          port: 443,
          method: 'GET',
          path: '/data/price?fsym=IOT&tsyms=EUR'
        };

        var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
        returnData = returnData + chunk;
        });

            res.on('end', () => {
            if(returnData!=null){    
                var result = JSON.parse(returnData);
                var ValueRounded = parseFloat(`${result.EUR}`).toFixed(2);
                this.response.speak(`The value of Iotcoin in euro is ${ValueRounded}  `);
                this.emit(':responseReady');
           } 
        });
    });
    req.end();
    },
    
    
    'NeocoinValueIntent': function () {
         this.emit('GetNeocoinValue'); 
    },
    
    'GetNeocoinValue': function () {
        //https://min-api.cryptocompare.com/data/price?fsym=NEO&tsyms=EUR
        var options = {
          host: 'min-api.cryptocompare.com',
          port: 443,
          method: 'GET',
          path: '/data/price?fsym=NEO&tsyms=EUR'
        };

        var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
        returnData = returnData + chunk;
        });

            res.on('end', () => {
            if(returnData!=null){    
                var result = JSON.parse(returnData);
                var ValueRounded = parseFloat(`${result.EUR}`).toFixed(2);
                this.response.speak(`The value of Neocoin in euro is ${ValueRounded}  `);
                this.emit(':responseReady');
           } 
        });
    });
    req.end();
    },
    
    

    'CryptocurrenciesValueIntent': function () {
         this.emit('GetCryptocurrenciesValue');
         
    },
    
    'GetCryptocurrenciesValue': function () {
        var cryptocurrency = this.event.request.intent.slots.cryptocurrency.value;
        var thepath="/data/price?fsym=" +cryptocurrency.toUpperCase() + "&tsyms=EUR";
        
        
        //https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=EUR
        //also see https://min-api.cryptocompare.com/data/all/coinlist
        var options = {
          host: 'min-api.cryptocompare.com',
          port: 443,
          method: 'GET',
          path: thepath
        };

        var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
        returnData = returnData + chunk;
        });

            res.on('end', () => {
            if(returnData!=null){    
                var result = JSON.parse(returnData);
                var ValueRounded = parseFloat(`${result.EUR}`).toFixed(2);
             
            this.response.speak(cryptocurrency.toUpperCase() + " in euro is " + ValueRounded);
            this.emit(':responseReady');
       
          } 
        });

    });
    req.end();
    },

    
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

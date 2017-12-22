/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';

var http = require("http");


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
    
            TIMESHEETDATA: [
            'Timesheet updated.',
            ],
            SKILL_NAME: 'Timesheet Update',
            GET_TIMESHEET_MESSAGE: "trying to update time sheet: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
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
    
    'OptionsIntent': function () {
         this.emit('GetOptions');
  
    },
    'GetOptions': function () {
        this.response.speak(`You can update your timesheet, see how many people have Overdue Timesheets, take holidays and for fun find interesting facts about space.
        For timesheet updates say update timesheet
        To see how many are overdue say overdue
        To take holidays say holidays
        For fun facts jsut say tell me a fact`);
        
        this.emit(':responseReady')
    },
    
    'holidaysIntent': function () {
        this.emit('Getholidays');
 
    },
    
    'Getholidays': function () {
        this.response.speak(`Booking this day next week off`);
        this.emit(':responseReady')
    },
    
    'BitcoinValueIntent': function () {
         this.emit('GetBitcoinValue');
         //this.emit('GetDogecoinValue'); //needs more work

  
    },
    
    'GetBitcoinValue': function () {
        //http://api.coindesk.com//v1/bpi/currentprice/EUR.json
        var options = {
          host: 'api.coindesk.com',
          port: 80,
          method: 'GET',
          path: '/v1/bpi/currentprice/EUR.json'
        }

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
        
         this.emit('GetDogecoinValue'); //needs more work

  
    },

 
    
    'GetDogecoinValue': function () {
        //https://api.coinmarketcap.com/v1/ticker/dogecoin/
        //http://api.coindesk.com//v1/bpi/currentprice/EUR.json
        //https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=EUR
        var options = {
          host: 'api.coinmarketcap.com',
          port: 80,
          method: 'GET',
          path: '/v1/ticker/dogecoin/'
        }

        var req = http.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
        returnData = returnData + chunk;
        });

            res.on('end', () => {
            var result = JSON.parse(returnData);
            this.response.speak(`The value of Dogecoin in usd as is ${result.id}`);
            this.emit(':responseReady');
        });

    });
    req.end();

  
    },
    
    

    
    'TimesheetUpdateIntent': function () {
        this.emit('SetTimeSheet');
 
    },
    
    'SetTimeSheet': function () {
        this.response.speak(`Updating timesheet,        timesheet updated.`);
        this.emit(':responseReady')
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


/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';

var http = require("http"); // need this to GET, PUT


const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {


    'en-GB': {
        translation: {
            FACTS: [
                'Did i do this.',
            ],
            SKILL_NAME: 'Space Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
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
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    
    
    'TimesheetUpdateIntent': function () {
        this.emit('UpdateTimeSheet');
    },
    
    'UpdateTimeSheet': function () {
    //=================================below code can be used to look at an array above and speak the result=====================
    //     // function called to update time sheet. 
    //     // Use this.t() to get corresponding language data
    //     const timesheetArr = this.t('TIMESHEETDATA');
   
    //   //============================
    //     //       // Create speech output
    // //    this.emit( ':tellWithCard','test'); // will override any other this.emit
    //   //=========================
       
    //     const sheetUpdated = timesheetArr[0];

    //     // Create speech output
    //     const speechOutput = this.t('GET_TIMESHEET_MESSAGE') + sheetUpdated;
    //     this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), sheetUpdated);
    
    //=============================================================================================================
    
    
     //================================the below code GET's data from a web site=============================================
    //  //https://atlas.version1.com/timesheets/details/B-41988/2017/51/week-view
    //     var options = {
    //       host: 'atlas.version1.com',
    //       port: 80,
    //       method: 'GET',
    //       path: '/timesheets/details/B-41988/2017/51/week-view'
    //     }

    //     var req = http.request(options, res => {
    //         res.setEncoding('utf8');
    //         var returnData = "";

    //         res.on('data', chunk => {
    //             returnData = returnData + chunk;
    //         });

    //         res.on('end', () => {
    //           var result = JSON.parse(returnData);

    //           //callback(result);
    //          // this.response.speak(`Hello there are ${result.dayToShow.length} `);

    //          this.emit(':responseReady');
    //         });

    //     });
    //     req.end();
//---------------------------------------------------------
      //http://api.open-notify.org/astros.json
        var options = {
          host: 'api.open-notify.org',
          port: 80,
          method: 'GET',
          path: '/astros.json'
        }

        var req = http.request(options, res => {
            res.setEncoding('utf8');
            var returnData = "";

            res.on('data', chunk => {
                returnData = returnData + chunk;
            });

            res.on('end', () => {
              var result = JSON.parse(returnData);

              //callback(result);
              this.response.speak(`Hello, there are ${result.people.length} people who need to update there timesheets.`);

             this.emit(':responseReady');
            });

        });
        req.end();
     //=============================================================================================================
    
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

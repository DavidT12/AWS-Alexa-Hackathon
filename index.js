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
                "A year on Mercury is just 88 days long.",
                "Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.",
                "Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.",
                "On Mars, the Sun appears about half the size as it does on Earth.",
                "Earth is the only planet not named after a god.",
                "Jupiter has the shortest day of all the planets.",
                "The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
                "The Sun contains 99.86% of the mass in the Solar System.",
                "The Sun is an almost perfect sphere.",
                "A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.",
                "Saturn radiates two and a half times more energy into space than it receives from the sun.",
                "The temperature inside the Sun can reach 15 million degrees Celsius.",
                "The Moon is moving approximately 3.8 cm away from our planet every year."
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
    
    'OverdueTimesheetsIntent': function () {
         this.emit('GetOverdueTimesheets');
  
    },
    
    'GetOverdueTimesheets': function () {
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

            this.response.speak(`Hello, there are ${result.people.length} people with Overdue Timesheets.`);
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


/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Hello World to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/*Import Twilio client*/
var accountSid = authentication.accountSid;
var authToken = authentication.authToken;

var client = require('twilio')(accountSid, authToken);
var MYNUMBER = "+12139857234";
var dataObject = {message: "Hi, this is a sample"};
client.messages.create({
               to: "+919986968493", 
               from: MYNUMBER, 
               body: dataObject.message
           }, function(err, message) { 
               if (err)
                   console.log("Error: " + err);
               else
                   console.log("success");
           });
module.exports = {
    accountSid : 'AC9d4cd8b5ba2b753f200ab0cc197f3b60',
    authToken : 'e51a9d207e35e8aa70080b614beedc18'
};

/**
 * HelloWorld is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var HelloWorld = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
HelloWorld.prototype = Object.create(AlexaSkill.prototype);
HelloWorld.prototype.constructor = HelloWorld;

HelloWorld.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("HelloWorld onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

HelloWorld.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("HelloWorld onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to Helmey, I am your personal driving assistant";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

HelloWorld.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

HelloWorld.prototype.intentHandlers = {
    // register custom intent handlers
    "HelloIntent": function (intent, session, response) {
        response.tell("Hello Phoebus!");
    },
    "GetMyLocationIntent": function (intent, session, response) {
        response.tell("You are in front of ITC Gardenia Residency Road Bangalore");
    },
    "GetDirectionsIntent": function (intent, session, response) {
        response.tell("Here are your directions");
        /*start telling the directions*/
    },
    "SendMessageIntent": function (intent, session, response) {
        /*message sending logic over here*/
        response.tell("Message sent");
    },
    "GetWeatherIntent": function (intent, session, response) {
        response.tell("The weather in Bangalore is");
    },
    "SendEmergencyInfoIntent": function (intent, session, response) {
        response.tell("Accident mode activated");
        /*send message to emergency services and dear ones*/
        response.tell("Emergency services notified");
        response.tell("I have also sent a message to your dear ones"); 
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var helloWorld = new HelloWorld();
    helloWorld.execute(event, context);
};


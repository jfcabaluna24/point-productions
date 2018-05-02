/*
 * Starter Project for Messenger Platform Quick Start Tutorial
 *
 * Remix this as the starting point for following the Messenger Platform
 * quick start tutorial.
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 */

'use strict';

// Imports dependencies and set up http server
const 
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const validator = require("email-validator");

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Get the webhook event. entry.messaging is an array, but 
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
      
      // Get the sender PSID
  let sender_psid = webhook_event.sender.id;
  console.log('Sender PSID: ' + sender_psid);
      
      // Check if the event is a message or postback and
  // pass the event to the appropriate handler function
  if (webhook_event.message) {
    handleMessage(sender_psid, webhook_event.message);        
  } else if (webhook_event.postback) {
    handlePostback(sender_psid, webhook_event.postback);
  }
    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "aabbccddee";
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Check if a token and mode were sent
  if (mode && token) {
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});

var message_="", re=0, nombre="", name="", email="", emailes="", streak=0;

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;
  streak=0;
  // Checks if the message contains text
  if (received_message.text) {    
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API  received_message.toLowerCase().indexOf('hello') != -1
    if(received_message.text == 'test'){
    
    }
    
    if(received_message.text == "Hi" || received_message.text == "Hello" || received_message.text == "I want to start" || received_message.text == "Hey" || received_message.text.toLowerCase().indexOf('hello') != -1 || received_message.text.toLowerCase().indexOf('hi') != -1 || received_message.text.toLowerCase().indexOf('hey') != -1)
    {
      var choices = ['Hi', 'Hey', 'Hello', 'Whats up', 'Howdy', 'Hola'];
      var index = Math.floor(Math.random() * choices.length);
      var resp = choices[index];
      
      response = {  "text":  `${resp}`+"\n\nDo you want to speak Spanish or English? ",
                    "quick_replies": [
                                      {
                                        "content_type":"text",
                                        "title":"English",
                                        "payload":"english"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Español",
                                        "payload":"spanish"
                                      }
                                    ]
                 }
    }
    else if (received_message.text === 'English') {
    
      var choices = ['Great', 'That’s wonderful', 'Excellent', 'Me too', 'Perfect', 'Great to hear it'];
      var index = Math.floor(Math.random() * choices.length);
      var resp = choices[index];
      
    response = {  "text": `${resp}`+"\n\nWhat is your skill level today?",
                  "quick_replies": [
                                      {
                                        "content_type":"text",
                                        "title":"Getting Started",
                                        "payload":"getting started"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Beginner",
                                        "payload":"beginner"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Intermediate",
                                        "payload":"intermediate"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Advanced",
                                        "payload":"advanced"
                                      }
                                    ]
               }
  } else if (received_message.text === 'Español') {
    var choices = ['Great', 'That’s wonderful', 'Excellent', 'Me too', 'Perfect', 'Great to hear it'];
      var index = Math.floor(Math.random() * choices.length);
      var resp = choices[index];
    
    response = { "text": `${resp}`+ "\n\nCuál es tu nivel de habilidad hoy?",
                  "quick_replies": [
                                      {
                                        "content_type":"text",
                                        "title":"CÓmo Comenzar",
                                        "payload":"como comenzar"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Principiante",
                                        "payload":"principiante"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Intermedio",
                                        "payload":"intermedio"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Advanzado",
                                        "payload":"advanzado"
                                      }
                                    ]
               }
    }
    else if (received_message.text=== 'Getting Started') {
      response = {"text": "We’re glad you are joining us.  We are a community of learners, both English and Spanish.  We help each other and learn from each other. If you want to join us, share your email address, so we can send you updates and invitations to live web meetings:\n\n\nWhat is your email address?"}
      message_ = "email";
    }
    else if (validator.validate(received_message.text) && message_ == 'email') {
      
       response = { "text": "What is your name" }
       message_ = "name";
       email = received_message.text;
    }
    else if (validator.validate(received_message.text) == false && message_ == 'email'){
       response  = {"text": "Email is not valid"}
      message_ = "email";
    }
    else if (message_ == 'name'){
      name = received_message.text;
      response = {"text": "Hello "+`${name}` +". Each day we will ask you to do a short activity.  We will keep track of how you are studying and invite you to live web meetings.\n\nWhat would you like to do today? Study on your own? Do a Cada Dia Activity? Find a Webinar or watch a recording? Find a Chat Partner?",
                  "quick_replies": [
                                      {
                                        "content_type":"text",
                                        "title":"STUDY ALONE",
                                        "payload":"study alone" 
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"WATCH A WEBINAR",
                                        "payload":"watch a webiner"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"FIND A PARTNER",
                                        "payload":"find a partner"
                                      } 
                                    ] 
                 }
      insertdata(sender_psid,name,email); //insert user data to database
      message_ = "";
      name="";
      email="";
    }
    else if (received_message.text === 'CÓmo Comenzar') {
      response = { "text": "Cuál es su nombre?:" }
      message_ = "nombre";
    }
    else if (message_ == "nombre") {
      nombre= received_message.text;
      response = {"text": `${received_message.text}`+ ",  Podemos enviarte un recordatorio por correo electrónico?",
                  "quick_replies": [
                                      {
                                        "content_type":"text",
                                        "title":"YES",
                                        "payload":"YES"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"NO",
                                        "payload":"NO"
                                      }                                      
                                    ]
                 }
       message_= "correo electrónico";
    }
    else if(message_ == "correo electrónico" && received_message.text === 'YES'){
       response = {"text": "Estupendo. Enviaremos recordatorios e invitaciones a reuniones web. ¿Cuál es tu dirección de correo electrónico?: "}
      re=1;
      message_= "correo electrónico";
      
    }
    else if(message_ == "correo electrónico" && re==1 && validator.validate(received_message.text) == true){
      re=0;
      emailes = received_message.text;
      response = {"text": `${nombre}`+", Es importante practicar 'Cada día' y aprender con nosotros. Llevaremos un registro de cuántos días está estudiando y cómo está mejorando.  Vamos.\n\n\n"+"Qué te gustaría hacer hoy? Estudia solo? Haz una actividad de Cada Día? Encuentre un webinar o mire una grabación? Encuentre un compañero de chat?",
                  "quick_replies": [
                                      {
                                        "content_type":"text",
                                        "title":"Estudia Solo",
                                        "payload":"Estudia Solo" 
                                      }, 
                                      {
                                        "content_type":"text",
                                        "title":"Mire una Reunión Web",
                                        "payload":"Mire una Reunión Web"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Encuentre un Compañero",
                                        "payload":"Encuentre un compañero de chat"
                                      } 
                                    ] 
                 }  
      insertdata(sender_psid,nombre,emailes);
      nombre="";
      email="";
      message_="";
    }
    else if(message_ == 'correo electrónico' && re ==1 && validator.validate(received_message.text) == false){
      response = {"text":"Error correo electrónico"}
      message_="correo electrónico";
    }
    else if(message_ == "correo electrónico" && received_message.text === 'NO'){
      
      response = {"text": "You can still join us, but you will not hear about web meetings and other events.\n\n" + `${nombre}`+", Es importante practicar 'Cada día' y aprender con nosotros. Llevaremos un registro de cuántos días está estudiando y cómo está mejorando.  Vamos."+"\n\n\nQué te gustaría hacer hoy? Estudia solo? Haz una actividad de Cada Día? Encuentre un webinar o mire una grabación? Encuentre un compañero de chat?",
                  "quick_replies": [
                                      {
                                        "content_type":"text",
                                        "title":"Estudia Solo",
                                        "payload":"Estudia Solo" 
                                      }, 
                                      {
                                        "content_type":"text",
                                        "title":"Mire una Reunión Web",
                                        "payload":"Mire una Reunión Web"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Encuentre un Compañero",
                                        "payload":"Encuentre un compañero de chat"
                                      } 
                                    ] 
                 }
      message_="";
    }
    else if(received_message.text === 'STUDY ALONE'){
      var title = "STUDY ALONE (CDE-START STUDY ACTIVITIES WEB PAGE).";
      var url="www.google.com";
      updateTimeFn(sender_psid,title,url);    
    }
    else if(received_message.text === 'WATCH A WEBINAR'){
      var title = "WATCH A WEBINAR (CDE-START WEBINAR WEB PAGE).";
      var url="www.google.com";
      updateTimeFn(sender_psid,title,url);
    }
    else if(received_message.text === 'FIND A PARTNER'){
      var title = "FIND A PARTNER (CDE-START FIND A STUDY PARTNER WEB PAGE) ";
      var url="www.google.com";
      updateTimeFn(sender_psid,title,url); 
    }
    else if(received_message.text === 'Estudia Solo'){
      var title = "STUDY ALONE (CDE-START STUDY ACTIVITIES WEB PAGE) ";
      var url="www.google.com";
      updateTimeFn(sender_psid,title,url);
    }
    else if(received_message.text === 'Mire una Reunión Web'){
      var title = "WATCH A WEBINAR (CDE-START WEBINAR WEB PAGE) ";
      var url="www.google.com";
      updateTimeFn(sender_psid,title,url);
    }
    else if(received_message.text === 'Encuentre un Compañero'){
      var title = "FIND A PARTNER (CDE-START FIND A STUDY PARTNER WEB PAGE) ";
      var url="www.google.com";
      updateTimeFn(sender_psid,title,url);
    }
    else if (received_message.text=== 'Beginner' || received_message.text==='Intermediate' || received_message.text==='Advanced') {
        getTimeFn(sender_psid,"en");
    }
    else if (received_message.text=== 'Principiante' || received_message.text==='Intermedio' || received_message.text==='Advanzado') {
          getTimeFn(sender_psid,"es");
    }

  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  } 
  
  // send typing bubble
  typingBubble(sender_psid);
  // Send the response message
  setTimeout(function () {
  callSendAPI(sender_psid, response);  
  }, 5000);
    
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;
  
  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

// Sends typing buble via the Send API
function typingBubble(sender_psid) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "sender_action":"typing_on"
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}

function insertdata(messengerid,name,email){

  request('https://www.point-productions.com/bots/insert.php?mid='+messengerid+'&name='+name+'&email='+email, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.stringify(JSON.parse(body)));
          //return callback(result, false);
        } else {            
            //return callback(null, error);;
        }
      });  
  
  /*** changed to request
const https = require('https');

https.get('https://www.point-productions.com/bots/insert.php?mid='+messengerid+'&name='+name+'&email='+email, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
    //console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});*/

  
}

function getTimeFn(messengerid,lang){

request('https://www.point-productions.com/bots/seetime.php?mid='+messengerid, function(error, response, body) {
  var res = "";
        if (!error && response.statusCode == 200) {
            streak = JSON.stringify(JSON.parse(body)); 
            if(lang=="en"){
                if (streak == 0){ res=  "Study each day 'Cada Día' to learn a new language.  Keep up the effort."; }
                else if (streak == 1){ res = "Great start. You have a one day streak.  Studying each day 'Cada Día' is the best way to learn a new language."; }
                else if (streak >= 2 && streak <= 5){ res = "You are doing great!  You have "+`${streak}`+ " days in a row.  Keep up the effort."; }
                else if (streak >= 6 && streak <= 10){ res = "Great work! You have "+`${streak}`+ " days in a streak."; }
                else if (streak >=10){ res = "Excellente. You have "+`${streak}`+ " days in a row. Keep going!"; }
                else{ res="";}
              
                response = { "text": ""+`${res}`+"",
                             "quick_replies": [
                                          {
                                            "content_type":"text",
                                            "title":"STUDY ALONE",
                                            "payload":"study alone" 
                                          },
                                          {
                                            "content_type":"text",
                                            "title":"WATCH A WEBINAR",
                                            "payload":"watch a webiner"
                                          },
                                          {
                                            "content_type":"text",
                                            "title":"FIND A PARTNER",
                                            "payload":"find a partner"
                                          } 
                                        ] 
                            }
            }
            else if(lang=="es"){
                if (streak == 0){ res=  "Estudia cada día para aprender un nuevo idioma. Mantenga el esfuerzo."; }
                else if (streak == 1){ res = "Gran comienzo. Tienes una racha de un día. Estudiar cada día 'Cada Día' es la mejor manera de aprender un nuevo idioma."; }
                else if (streak >= 2 && streak <= 5){ res = "Lo estás haciendo genial! Usted tiene "+`${streak}`+ " días seguidos. Mantenga el esfuerzo."; }
                else if (streak >= 6 && streak <= 10){ res = "Buen trabajo! Tienes "+`${streak}`+ " días en una racha."; }
                else if (streak >=10){ res = "Excellente. Tienes "+`${streak}`+ " días seguidos. ¡Sigue adelante!"; }
                else{ res="";}
              
              
                response = {"text": ""+`${res}`+"",
                            "quick_replies": [
                                      {
                                        "content_type":"text",
                                        "title":"Estudia Solo",
                                        "payload":"Estudia Solo" 
                                      }, 
                                      {
                                        "content_type":"text",
                                        "title":"Mire una Reunión Web",
                                        "payload":"Mire una Reunión Web"
                                      },
                                      {
                                        "content_type":"text",
                                        "title":"Encuentre un Compañero",
                                        "payload":"Encuentre un compañero de chat"
                                      } 
                                    ] 
                           }
            }
            else{
                  response = {"text": "Error"}           
                }
          
            // send typing bubble
            typingBubble(messengerid);
            // Send the response message with 5sec delay
            setTimeout(function () { callSendAPI(messengerid, response); }, 5000);
               
          //return callback(result, false);
        } else {            
            //return callback(null, error);;
        }
      });

}

function updateTimeFn(messengerid,title,url){
  
    request('https://www.point-productions.com/bots/updatetime.php?mid='+messengerid, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            
             console.log(JSON.stringify(JSON.parse(body))); 
          
             response = {
                          "attachment": {
                            "type": "template",
                            "payload": {
                              "template_type": "generic",
                              "elements": [{
                                "title": "Click Button to Visit Site",
                                "buttons": [
                                  {
                                    "type": "web_url",
                                    "url": ""+`${url}`+"",
                                    "title": ""+`${title}`+""
                                  }
                                ],
                              }]
                            }
                          }
                        } 
            
            // send typing buble 
            typingBubble(messengerid);
            // Send the response message
            setTimeout(function () { callSendAPI(messengerid, response); }, 5000);
               
          //return callback(result, false);
        } else {            
            //return callback(null, error);;
        }
      });
}

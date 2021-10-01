import {
  ErrorHandler,
  HandlerInput,
  RequestHandler,
  SkillBuilders,
} from 'ask-sdk-core';
import {
  Response,
  SessionEndedRequest,
} from 'ask-sdk-model';

const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Welcome to glimpse, ask me how to sign a word or phrase';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Welcome to glimpse, ask me how to sign a word or phrase', speechText)
      .getResponse();
  },
};

const ShowMeSignIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'ShowMeSignIntent';
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = `The sign for I love you is a combination of the finger spelled letters <say-as interpret-as="characters">I L Y</say-as> Your thumb and index finger together form an <say-as interpret-as="characters">L</say-as>, while your little finger forms an <say-as interpret - as="characters" >I</say-as>. In addition, your thumb and little finger are expressing a <say-as interpret - as="characters" >Y</say-as>. So if you combine all three handshapes, you get <say-as interpret - as="characters" >I L Y</say-as>for I love you.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('The sign for', speechText)
      .getResponse();
  },
};
// const AskWeatherIntentHandler: RequestHandler = {
//   canHandle(handlerInput: HandlerInput): boolean {
//     const request = handlerInput.requestEnvelope.request;
//     return request.type === 'IntentRequest'
//       && request.intent.name === 'AskWeatherIntent';
//   },
//   handle(handlerInput: HandlerInput): Response {
//     const speechText = 'The weather today is sunny.';

//     return handlerInput.responseBuilder
//       .speak(speechText)
//       .withSimpleCard('The weather today is sunny.', speechText)
//       .getResponse();
//   },
// };

const HelpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'You can ask me how to sign I Love You';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('You can ask me the weather!', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput: HandlerInput): Response {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Goodbye!', speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput): boolean {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput: HandlerInput): Response {
    console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error): boolean {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error): Response {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I don\'t understand your command. Please say it again.')
      .reprompt('Sorry, I don\'t understand your command. Please say it again.')
      .getResponse();
  }
};

exports.handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ShowMeSignIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
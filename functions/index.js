// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');

admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.createAlert = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  // const original = req.query.text;


  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('alerts').add({
    playerName: "Darren",
    playerId: "player-id",
    alertType: "email"
  });

  // Send back a message that we've successfully written the message
  res.json({ result: `alert with ID: ${writeResult.id} added.` });
});

exports.sendAlert = functions.firestore.document('/alerts/{documentId}')
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data();
    console.log('original = ', original);


    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log('alert with id', context.params.documentId, " added");


    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.


    return snap.ref.set({ hasBeenTriggered: true }, { merge: true });
  });


// What the alert going to look like?
// will need players name, id and alert type: "email"

// How will the triggeres work?

// Will need to get all users who have alerts
// Will need to call the api once a minute
// Then compare the list of player alerts one at a time so for example
// When a player creates an alert it will be saved to the alerts collection
// each time a user adds a new alert it will pushed into their alerts array inside the doc like

// const alertsCollections = [
//   {
//     userId: "jiej3iedj9dj",
//     alerts: [
//       {
//         playerId: "p1",
//         isOnline: true, // needs to be checked/set every 5mins
//         alertType: "email",
//         alertTrigger: "playerLogsOff",
//         serverId: "tatarisId"
//       },
//       {
//         playerId: "p2",
//         isOnline: false, // needs to be checked/set every 5mins
//         alertType: "email",
//         alertTrigger: "playerLogsOff",
//         serverId: "tatarisId"
//       },
//     ]
//   },

//  {
//   alerts: [
//     {
//       playerId: "p3",
//       isOnline: true, // needs to be checked/set every 5mins
//       alertType: "email",
//       alertTrigger: "playerLogsOff",
//       serverId: "enjoyId"
//     },
//     {
//       playerId: "p4",
//       isOnline: false, // needs to be checked/set every 5mins
//       alertType: "email",
//       alertTrigger: "playerLogsOff",
//       serverId: "enjoyId"
//     },
//   ]
// }
// ]

// Then i can schedule a function to run every 5mins that checks these alerts againts the result from the api
// so, the api call will check each server that a player is triggered against

// Loop the collection and build the api query...
// const queryObject = {
//   serverIds: [],
//   playerIds: []
// };
// alertsCollections.forEach((alert) => {
//   alert.alerts.forEach((item) => {
//     queryObject.serverIds.push(serverId) // but only if server id is unique
//     queryObject.playerIds.push(serverId) // but only if server id is unique
//   })
// });

// example queryObject = {
//   userOne: {
//     queries: [
//       {
//         serverId: "serverOne",
//         playerId: "playerOne"
//       },
//       {
//         serverId: "serverTwo",
//         playerId: "playerTwo"
//       },

//     ]
//   },
// } 

// generate a list of server ids
// generate a list of players, but with the associated server like {player: "playerId", server: "tatarisId"}
  // so the player can be checked against a server
// add the server ids to the api call
// loop the returned servers and check the players against the server
// player is online, set the isOnline flag to true
// function runs 5mins later is player found? no, has logged off, sendAlert(loggedOff);

// So will need to check how the api accepts multiple servers in one query
// maybe https://api.battlemetrics.com/servers/[serverIdsArray]
// This will return all the servers, will then need to loop through the data and extract the players data
// Will then need to check the against the players from the alertsCollection

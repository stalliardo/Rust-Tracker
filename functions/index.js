import functions from 'firebase-functions';


import admin from 'firebase-admin';
import { generateApiQueryFromAlerts } from './database.js';

admin.initializeApp();

export const refreshPlayerStatus = functions.https.onRequest(async (req, res) => {

  // Will need to pass my id via the params

  // const writeResult = await admin.firestore().collection('alerts').add({
  //   playerName: "Darren",
  //   playerId: "1120601975",
  //   serverId: "5967676",
  //   alertType: "email",
  //   isOnline: null
  // });

  //TODO call process.env.ADMIN_ID

  const promises = await generateApiQueryFromAlerts();
  const apiData = [];

  if (promises.length) {
    const response = await Promise.all(promises);
    response.forEach((r, index) => {
      apiData.push({
        meta: r.data.included[0].meta,
        serverId: r.data.included[0].id,
        playerId: r.data.data.id
      });
    })

    const alerts = await admin.firestore().collection("alerts").get();

    alerts.forEach(async (alert) => {
      // find the array with the matching playerid and serverid. then update that record
      const match = apiData.find(data => (data.serverId === alert.data().serverId && data.playerId === alert.data().playerId));
      await alert.ref.update({ isOnline: match.meta.online })
    })
  } else {
    return res.json({message: "No alerts found"})
  }


});

// exports.sendAlert = functions.firestore.document('/alerts/{documentId}')
//   .onCreate((snap, context) => {
//     // Grab the current value of what was written to Firestore.
//     const original = snap.data();
//     console.log('original = ', original);


//     // Access the parameter `{documentId}` with `context.params`
//     functions.logger.log('alert with id', context.params.documentId, " added");


//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to Firestore.
//     // Setting an 'uppercase' field in Firestore document returns a Promise.


    // return snap.ref.set({ hasBeenTriggered: true }, { merge: true });
//   });

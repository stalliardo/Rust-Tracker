import functions from 'firebase-functions';
import admin from 'firebase-admin';
import { generateApiQueryFromAlerts } from './database.js';

const dummyAlerts = [
  {
    playerId: "176101308", // "velure",
    serverId: "15111552", // tideRust
    isOnline: false
  },
  {
    playerId: "60183343", // "jaz",
    serverId: "15111552", // tideRust
    isOnline: true
  },
  {
    playerId: "1388354", // "BARF",
    serverId: "15111552", // tideRust
    isOnline: false
  }
]

admin.initializeApp();

export const addDummyData = functions.https.onRequest(async (req, res) => {
  dummyAlerts.forEach(async (alert) => {
    await admin.firestore().collection("alerts").add(alert);
  });

  res.json({message: "alerts added"})
})

export const refreshPlayerStatus = functions.https.onRequest(async (req, res) => {
  // TODO - Change below to the apps url not a wildcard...
  res.set("Access-Control-Allow-Origin", "*");
  const userId = req.query.userId;
  const adminId = process.env.ADMIN_ID;

  if (userId === adminId) {
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
      });

      const alerts = await admin.firestore().collection("alerts").get();
      const updatedAlerts = [];
      const alertPromises = [];

      alerts.forEach((alert) => {
        const match = apiData.find(data => (data.serverId === alert.data().serverId && data.playerId === alert.data().playerId));
        if(match.meta.online !== alert.data().isOnline) {
          alertPromises.push(alert.ref.update({ isOnline: match.meta.online }))
          const formattedData = {...alert.data()};
          formattedData.isOnline = match.meta.online;
          formattedData.id = alert.id;
          updatedAlerts.push(formattedData);
        }
      });

      if(alertPromises.length) {
        await Promise.all(alertPromises);
      }

      if(updatedAlerts.length > 0) {
        return res.json({ message: `${updatedAlerts.length} alerts updated.`, data: updatedAlerts});
      }

      return res.json({message: "Function execution complete."});
    } else {
      return res.json({ message: "No alerts found" });
    }
  } else {
    return res.status(403).json({ message: "The provided user id is not authorized to perform that action." })
  }  
});

  // const newAlert = {
  //   serverId: "tatarisId",
  //   playerId: "playerId",
  //   isOnline: false,
  //   isNew:  true,
  // }

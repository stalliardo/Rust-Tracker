import functions from 'firebase-functions';


import admin from 'firebase-admin';
import { generateApiQueryFromAlerts } from './database.js';

admin.initializeApp();

export const refreshPlayerStatus = functions.https.onRequest(async (req, res) => {
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
      })

      const alerts = await admin.firestore().collection("alerts").get();

      alerts.forEach(async (alert) => {
        const match = apiData.find(data => (data.serverId === alert.data().serverId && data.playerId === alert.data().playerId));

        //TODO set the isNew field if isNew is true.
        await alert.ref.update({ isOnline: match.meta.online })
      })
    } else {
      return res.json({ message: "No alerts found" })
    }
  } else {
    return res.status(403).json({ message: "The provided user id is not authorized to perform that action." })
  }
});

// TODO - sendAlert to either email, site or sms...

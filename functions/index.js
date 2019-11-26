const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.setRegularUserRights = functions.auth.user().onCreate((user) => {
    let basicUserClaim = {
        admin: false
    };

    return admin.auth().setCustomUserClaims(user.uid, basicUserClaim)
        .then(() => {
            //     admin.firestore().collection("session").doc(user.uid).set({ refreshTime: new Date().getTime() });
        })
        .catch(console.error);
});

exports.set_admin = functions.https.onCall((data, context) => {
    let user = data.user;

    let adminClaim = {
        admin: true
    };

    try {
        admin.auth().setCustomUserClaims(user.uid , adminClaim);
    } catch (error) {
        console.error(`failed to give ${user.name} an admin role: `, error);

        return {
            message: `failed to give ${user.name} an admin role: `, error
        }
    }

    return {
        message: `${user.name} is now an admin`
    };
});

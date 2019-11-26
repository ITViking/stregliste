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
    let customClaims = {
        admin: false
    };

    return admin.auth().setCustomUserClaims(user.uid, customClaims)
        .then(() => {
            //     admin.firestore().collection("session").doc(user.uid).set({ refreshTime: new Date().getTime() });
        })
        .catch(console.error);
});

exports.restart_project = functions.https.onCall((data, context) => {
    console.log("recieved data: ", data);
    let users = data.users;

    if(!users) return { message: "no users recieved" };

    users.map(user => {
        try {
            admin.auth().deleteUser(user.uid)
        } catch(error) {
            console.error("failed to delete user: ", user);
        }

        return { message: "users were deleted from auth" };
    });
});

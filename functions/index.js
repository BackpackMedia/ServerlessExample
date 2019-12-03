const functions = require('firebase-functions')
const admin = require('firebase-admin')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

//Default
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Google Whack");
});

//C - Create
// when user adds txt we push to the database
exports.addComment = functions.https.onRequest(async(request, response) => {
    message = request.query.text
    snap = await admin.database().push(message)
    response.redirect(303, snap.ref.toString())
})
//R - Read
//U - Update
//D - Delete


/*
we just want all this to go to the db, we don't care about structure right now
All data in key: value
that being said the key won't be important on creation but does becaome important in RUD
*/
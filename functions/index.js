const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

/*
    Endpoint: /helloWorld
*/
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Google Whack");
});

/*
    C - Create
    when user adds txt we push to the database
    Endpoint: /addComment?text=
*/
exports.addComment = functions.https.onRequest(async(request, response) => {
    message = request.query.text
    snap = await admin.database().ref().push(message)
    response.send(snap.ref.toString())
})

//R - Read
//kinda useless for this but I'm going to write it anyway

/*
    U - Update
    When user give a word we update it with another word
    Endpoint: /updateComment?old=&new=
*/

exports.updateComment = functions.https.onRequest(async(request, response) => {
    //get query params
    og_msg = request.query.old
    new_msg = request.query.new
    var key = ''
    var path = admin.database().ref()
    //search db for old
    // eslint-disable-next-line promise/catch-or-return
    // eslint-disable-next-line promise/always-return
    path.once("value").then(snap => {
        snap.forEach(child => {
        if(child.val() === og_msg) //check to see if the value is equal to the og text
            key = child.key
        })
    })
    snap = await admin.database().ref().child(key).update(new_msg)
    response.redirect(303, snap.ref.toString()) //this is ok for now so we can see change
})
//D - Delete
//Allow user to delete a word

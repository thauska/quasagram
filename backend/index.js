/**
 * dependencies
 */
const express = require('express')
const admin = require('firebase-admin');

/**
 * config - express, firebase
 */
const app = express()

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


/**
 * endpoints
 */

app.get('/posts', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')

    let posts = []

    db.collection('posts').orderBy('date', 'desc').get().then( snapshot =>{
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            posts.push(doc.data())
        })
        res.send(posts)
    })

})

/**
 * listen
 */
app.listen(process.env.PORT || 3000)

/**
 * dependencies
 */
const express = require('express')
const admin = require('firebase-admin');
let inspect = require('util').inspect;
let Busboy = require('busboy')

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

app.post('/createPost', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    // res.send(req.headers)

    /**
     * https://github.com/mscdex/busboy
     */
    let busboy = new Busboy({ headers: req.headers });

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      })
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      })
    })

    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    })

    busboy.on('finish', function() {
      console.log('Done parsing form!');
      // res.writeHead(303, { Connection: 'close', Location: '/' })
      res.send('Done parsing form!')
    })

    req.pipe(busboy)

    // busboy.end(req.rawBody) // For Cloud function
})

/**
 * listen
 */
app.listen(process.env.PORT || 3000)

/**
 * dependencies
 */
const express = require('express')

/**
 * config - express
 */
const app = express()

/**
 * endpoints
 */

app.get('/posts', (req, res) => {
    let posts = [
        {
            caption: 'Golden Gate Bridge',
            location: 'Belém, Brazil'
        },
        {
            caption: 'Ver-o-Rio',
            location: 'Belém, Brazil'
        },
        {
            caption: 'Mangal das Garças',
            location: 'Belém, Brazil'
        }
    ]

    res.send(posts)
})

/**
 * listen
 */
app.listen(process.env.PORT || 3000)

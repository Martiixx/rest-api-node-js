const functions = require('firebase-functions');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const mongooseConfig = { useNewUrlParser: true }

const { username, password } = functions.config().mongo // firebase functions:config:set mongo.username=<username> mongo.password=<password>
const mongoUri = `mongodb://${username}:${password}@ds155714.mlab.com:55714/rest-api`

mongoose.connect(mongoUri ,mongooseConfig)

const app = express();

const Pets = require('./Pets')
const createServer = () => {

    app.use(cors({origin: true}));

    app.get('/pets', async (request, response) => {
        const result = await Pets.find({}).exec()

        // const pet = new Pets({
        //     nombre: 'Snow Ball!',
        //     tipo: 'Gato',
        //     descripcion: 'atropellado'
        // })
        //
        // pet.save()

        response.send(result)
    })

    app.post('/pets', async (req, res) => {
        const { body } = req //nombre, tipo y descripcion
        const Pet = new Pets(body)

         await Pet.save()

        res.sendStatus(204)
    })

    app.get('/pets/:id/daralta', async (req, res) => {
        const { id } = req.params
        await Pets.deleteOne({ _id: id }).exec()
        res.sendStatus(204)
    })
    return app;
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.api = functions.https.onRequest(createServer());

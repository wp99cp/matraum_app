import * as functions from "firebase-functions";

exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("dsfsdfdsf from 002!");
});


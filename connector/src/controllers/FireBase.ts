import FireBaseAdmn from 'firebase-admin';
import * as key from "./air-pollution-70068-firebase-adminsdk-pzqkq-0f0b221f89.json"
import JsonLdObJ from '../Types';


class FireBase {

    public static fireBaseInst = new FireBase();
    public db: FireBaseAdmn.firestore.Firestore;


    static getInstance(): FireBase {
        if (!this.fireBaseInst)
            this.fireBaseInst = new FireBase();
        return this.fireBaseInst;
    }

    constructor() {
        const stringKey = ((key as unknown) as string)

        FireBaseAdmn.initializeApp({
            credential: FireBaseAdmn.credential.cert(stringKey)
        })

        this.db = FireBaseAdmn.firestore();
    }

    async getData(): Promise<JsonLdObJ> {

        let resp: JsonLdObJ = {
            "@context": {
                "@schema": "firebase"
            },
            "@type": "air_pollution",
            "@list": []
        }
        try {
            const airPollution = this.db.collection('air_pollution');
            const snapshot = await airPollution.limit(5).get();

            snapshot.forEach(doc => {
                resp['@list'].push({
                    "@id": doc.id,
                    ...doc.data()
                })
            });

        } catch (err) {
            console.log(err);
            console.log("An error occured while fetching data");
        }
        return resp;
    }

}

export const fireBaseInst: FireBase = FireBase.getInstance();


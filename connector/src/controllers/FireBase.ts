import FireBaseAdmn from 'firebase-admin';
import * as key from "./air-pollution-70068-firebase-adminsdk-pzqkq-0f0b221f89.json"
import JsonLdObJ from '../Types';
import validate from '../Validation';


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

    async getData(data_type: string, snippet: string): Promise<JsonLdObJ> {

            

        let resp: JsonLdObJ = {
            "@context": {
                "@schema": "firebase/" + data_type
            },
            "@list": []
        }
        try {
            
            const dataSet = this.db.collection(data_type);
            if(snippet === 'true'){
                const snapshot = await dataSet.limit(10).get();
                if(snapshot.empty){
                    console.log("The collection doesn't exist or it's empty!");
                    resp['@context'] = {"@schema": "Type doesn't exist"}
                }else{
                    const data = validate(snapshot, 30);
                    data.forEach((doc:any) => {
                        resp['@list'].push({
                            "@id": doc.id,
                            ...doc.data()
                        })
                    });
                }
            }else{
                const snapshot = await dataSet.get();
                if(snapshot.empty){
                    console.log("The collection doesn't exist or it's empty!");
                    resp['@context'] = {"@schema": "Type doesn't exist"}
                }else{
                    const data = validate(snapshot, 30);
                    data.forEach((doc:any) => {
                        resp['@list'].push({
                            "@id": doc.id,
                            ...doc.data()
                        })
                    });
            
                }
            }

        } catch (err) {
            console.log(err);
            console.log("An error occured while fetching data");
        }
        return resp;
    }

}

export const fireBaseInst: FireBase = FireBase.getInstance();


import express from "express";
import JsonLdObJ from "../Types";
import { fireBaseInst } from "./FireBase";

class Retrieve {
    //http://localhost:nr_port/get_data?data_type=<tipul specificat>
    public path=""
    public router = express.Router();

    constructor(){
      this.initRoutes();
    }
    public initRoutes():void{
        this.router.get('/get_data',this.getData);
    }


    async getData(req:any,resp:any):Promise<any>{

      if(!req.query.data_type)
        return resp.sendStatus(404);
     
      const requestedDataType:string = req.query.data_type;
      if(requestedDataType.length === 0)
      {
         return resp.sendStatus(400);
      }

      if(requestedDataType !== "air_pollution")
      {
        return resp.sendStatus(400);
      }

      // let retrievedData:JsonLdObJ;
      // try
      // {
      //   retrievedData = await fireBaseInst.getData();
        
      //   resp.status(200).json(retrievedData);

      // } catch(err){
      //     resp.sendStatus(500);
      // }
       return resp.sendStatus(200);
    }

}

export default Retrieve;
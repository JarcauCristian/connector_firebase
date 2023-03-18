import express from "express";
import JsonLdObJ from "../Types";
import { fireBaseInst } from "./FireBase";

class Retrieve {
    //http://localhost:nr_port/get_data?data_type=<tipul specificat>&snippet=true
    public path=""
    public router = express.Router();

    constructor(){
      this.initRoutes();
    }
    public initRoutes():void{
        this.router.get('/get_data',this.getData);
        this.router.get('/get_meta',this.getMeta);
    }


    async getData(req:any,resp:any):Promise<any>{

      const requestedDataType:string = req.query.data_type;
      const requestedSnippet:string = req.query.snippet;

      if(!req.query.data_type || !req.query.snippet)
        return resp.sendStatus(404);

      if(requestedDataType.length === 0 || requestedSnippet.length === 0)
      {
         return resp.sendStatus(400);
      }

      if(requestedSnippet !== "true" && requestedSnippet !== "false")
      {
        return resp.sendStatus(400);
      }

      let retrievedData:JsonLdObJ;
      try
      {

        retrievedData = await fireBaseInst.getData(req.query.data_type,requestedSnippet);
        resp.status(200).json(retrievedData);
        
      } catch(err){
          resp.sendStatus(500);
      }
       
    }

    async getMeta(req:any,resp:any):Promise<any>{
      
      try
      {
        const retrievedData = await fireBaseInst.getMeta();
        resp.status(200).json(retrievedData);
        
      } catch(err){
          resp.sendStatus(500);
      }
       
    }

}

export default Retrieve;
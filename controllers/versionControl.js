import models from "../models/versionControl";
import { apiReturnMessage } from "../functions/apiMessage";
import "regenerator-runtime/runtime";

module.exports = {
  getKey: async (req, res) => {
    
    const key = req.params.key;
    const time = req.query.timestamp;
    const filter = {key};
    
    if (time) {
      filter['createdAt'] = { "$lte": time }
    }

    const data = await models.find(filter)
      .sort({ createdAt: -1 })
      .limit(1);
    if(data.length < 1){
      res.status(200).json(apiReturnMessage(200, data,  "No Data Found"));
    }else{
      res.status(200).json(apiReturnMessage(200, data,  "Success"));
    }
  },

  save: async (req, res) => {
    
    if(validatePostData(req)){ 
      await res.status(401).json(apiReturnMessage(401, "", "Error: Wrong content type header or data should be JSON format.")); 
    }else{
      const keys = Object.keys(req.body);
      var saveData = {
        key: keys[0],
        value: req.body[keys]
      } 
      var model = new models(saveData);
      const data = await model.save();
      res.status(200).json(apiReturnMessage(200, data, "Success"));
    }
  }
}

const validatePostData =  (req) => {
  return req.headers['content-type']!='application/json' && typeof(req.body)==='object';
}

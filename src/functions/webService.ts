import Axios from 'axios'

interface valueType {
  social_id : string,
  social_link : string,
  social_type : string,
}

export const  webService = async (method : string , url: string , val?: valueType) => {
        try {
          let res = await Axios({
            method: method,
            url: url,
            data : val
          });
      
          let data = res.data;
          return data;
        } catch (error : any) {
      
          return error.response;
        }
}
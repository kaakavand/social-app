import Axios from 'axios'
export const  webService = async (method : string , url: string , val?: any) => {
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
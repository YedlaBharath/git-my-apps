import axios from "axios";

const baseurl = "http://localhost:64823/api/";

export default {
  UserActions(url = baseurl + "DB7Hills/") {
    return {
      fetchAll: () => axios.get(url),
      fecthById: (id) => axios.get(url + id),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  },
  itemsAPI(url = baseurl + "DB7HillsInsertItems/"){
      return {
          fetchAll: () => axios.get(url),
          create: (newRecord) => axios.post(url, newRecord,{
              headers: {'Content-Type': 'multipart/form-data'}
          }),
          update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
          delete: (id) => axios.delete(url+id)
        }
    },
  ownersAPI(url=baseurl+"OwnerDetailsModels/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord,{
          headers: {'Content-Type': 'multipart/form-data'}
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  }
};

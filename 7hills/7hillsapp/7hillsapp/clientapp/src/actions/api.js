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
  addtocartAPI(url = baseurl + "AddToCartModels/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  userloginAPI(url = baseurl + "UserLoginModels/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  usersignupAPI(url = baseurl + "SignUpUser/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  usersignUPAPI(url = baseurl + "SignUpUserNew/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  savecartAPI(url = baseurl + "AddCartItems/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  menuAPI(url = baseurl + "Menu/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  vegsnacksAPI(url = baseurl + "VegSnacks/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  vegcurriesAPI(url = baseurl + "VegCurries/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  biryaniAPI(url = baseurl + "Biryani/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  bestofsevenhillsAPI(url = baseurl + "BestOfSevenHillsModels/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  chickensnacksAPI(url = baseurl + "ChickenSnacks/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  muttonsnacksAPI(url = baseurl + "MuttonSnacks/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  fishprawnssnacksAPI(url = baseurl + "FishPrawnsSnacks/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  chickencurriesAPI(url = baseurl + "ChickenCurries/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  muttoncurriesAPI(url = baseurl + "MuttonCurries/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  tandooriAPI(url = baseurl + "Tandoori/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  rotinaanAPI(url = baseurl + "RotiNaan/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url,newRecord,{
        headers:{
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'form-data'
        }
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  itemsAPI(url = baseurl + "DB7HillsInsertItems/"){
      return {
          fetchAll: () => axios.get(url),
          fecthById: (id)=> axios.get(url+id),
          create: (newRecord) => axios.post(url, newRecord,{
              headers: {
                'Content-Type': 'multipart/form-data',
                'Content-Disposition': 'form-data'}
          }),
          update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
          delete: (id) => axios.delete(url+id)
        }
    },
  ownersAPI(url=baseurl+"OwnerDetailsModels/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Disposition': 'form-data'}
      }),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  },
  signupAPI(url=baseurl+"Signup/"){
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord
      //   ,{
      //     headers: {
      //       'Accept': 'application/json',
      //           'Content-Type': 'application/json'}
      // },
      ),
      update: (id, updatedRecord) => axios.put(url+id,updatedRecord),
      delete: (id) => axios.delete(url+id)
    }
  }
};

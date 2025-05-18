import { appuri } from "../ApiUrl/appurl"
export const createCatagory = async (Catagory) => {
    try {
        const res = await fetch(`${appuri}api/catagory/createcatagory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ name: Catagory }) 
        });
        const data = await res.json();
        return {
            status: res.status,
            data,
        }
    } catch (error) {

    }
}


export const GetAllcatagory = async ()=>{
  try {
      const resp = await fetch (`${appuri}api/catagory/GetAllcatagory`)
      const data = await resp.json();
      return data;
  } catch (error) {
      console.error("Error fetching Catagory", error);
      return null
  }
}


export const editCatagory = async (id, name) => {
    try {
      const res = await fetch(`${appuri}api/catagory/editCatagory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name }), // name to update
      });
  
      const data = await res.json();
      return {
        status: res.status,
        data,
      };
    } catch (error) {
      console.error("Edit category error", error);
    }
  };
  

export const deltecatagory = async (id)=>{
  try {
    const res = await fetch(`${appuri}api/catagory/deleteCatagory/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    const data = await res.json()
    return {
      status : res.status,
       data
    }
  } catch (error) {
    console.error("Delete category error:", error);
    return {
      status: 500,
      data: { message: "Something went wrong" }
    };
  }
}
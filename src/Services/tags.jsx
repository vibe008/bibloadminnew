import { appuri } from "../ApiUrl/appurl"
export const createTag = async (Catagory) => {
    try {
        const res = await fetch(`${appuri}api/tag/createtag`, {
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

export const GetAllTags = async ()=>{
    try {
        const resp = await fetch (`${appuri}api/tag/getAlltag`)
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error fetching Catagory", error);
        return null
    }
  }


  export const editTag = async (id, name) => {
    try {
      const res = await fetch(`${appuri}api/tag/editTag/${id}`, {
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
  

export const delteTag = async (id)=>{
  try {
    const res = await fetch(`${appuri}api/tag/deletetag/${id}`, {
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
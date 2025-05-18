
import { appuri } from "../ApiUrl/appurl"


export const createPost = async (formdata) => {
  try {
    const res = await fetch(`${appuri}api/posts/createPost`, {
      method: 'POST',
      credentials: 'include',
      body: formdata,
    });

    const data = await res.json();
    return {
      status: res.status,
      data,
    };
  } catch (error) {
    console.log("error", error);
  }
};


export const GetUserStorys = async (id) => {
  try {
    const resp = await fetch(`${appuri}api/posts/findbyuser/${id}`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("Error fetching post", error);
    return [];
  }
};

export const GetStorysbySlug = async (slug) => {
  try {
    const resp = await fetch(`${appuri}api/posts/story/${slug}`);
    const data = await resp.json();
    return {
      status: resp.status,
      data,
    };
  } catch (error) {
    console.error("Error fetching post", error);
    return null;
  }
};

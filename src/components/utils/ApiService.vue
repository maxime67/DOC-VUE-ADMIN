<script>
import axios from "axios";
import router from "@/router/index.js";



export const fetchCategories = async (categories) => {
  try {
    const response = await axios.get(import.meta.env.VITE_APIURL + '/api/categories');
    return response.data;
  } catch(error){
    console.error('Error fetching categories:', error);
  }
};

export const fetchAll = async () => {
  try {
    const response = await axios.get(
        import.meta.env.VITE_APIURL + `/api/documentation/`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all data:', error);
  }
}

export const fetchByCategory = async (id) => {
  try {
    const response = await axios.get(
        import.meta.env.VITE_APIURL + `/api/documentation/category/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching documentation by categories:', error);
  }
}

export const updateDoc = async (id) => {
  try {
    router.push({ name: 'updateDocumentation', params: { id: id } });
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

export const searchByName = async (name) => {
  try {
    console.log(name);
    
    const response = await axios.get(
        import.meta.env.VITE_APIURL + `/api/documentation/search/${name}`,
    );
    return response.data;

  } catch (error) {
    console.error('Error fetching documenattion by name:', error);
  }
}
export const deleteDoc = async (id) => {
  try {
    await axios.delete(
        import.meta.env.VITE_APIURL + `/api/documentation/${id}`,
    );
    location.reload()
  } catch (error) {
    console.error('Error delete documentation:', error);
  }
}
export const deleteCat = async (id) => {
  try {
    await axios.delete(
        import.meta.env.VITE_APIURL + `/api/categories/${id}`,
    );
    location.reload()
  } catch (error) {
    console.error('Error delete category:', error);
  }
}
</script>

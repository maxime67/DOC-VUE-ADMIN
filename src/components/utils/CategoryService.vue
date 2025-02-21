<script>
import axios from "axios";



export const fetchAllCategories = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_APIURL + '/api/categories');
    return response.data;
  } catch(error){
    console.error('Error fetching categories:', error);
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await axios.get(import.meta.env.VITE_APIURL + '/api/categories/' + id);
    return response.data;
  } catch(error){
    console.error('Error fetching categories:', error);
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(
        import.meta.env.VITE_APIURL + `/api/categories/${id}`,
    );
    location.reload()
  } catch (error) {
    console.error('Error delete category:', error);
  }
}

export const updateCategoryName = async (id, newName) => {
  try {
    await axios.put(
        import.meta.env.VITE_APIURL + `/api/categories/${id}`,
        newName
    );
  } catch (error) {
    console.error('Error update category:', error);
  }
}
export const createCategory = async (name) => {
  try {
    await axios.post(
        import.meta.env.VITE_APIURL + `/api/categories`,
        name
    );
  } catch (error) {
    console.error('Error create category:', error);
  }
}
</script>

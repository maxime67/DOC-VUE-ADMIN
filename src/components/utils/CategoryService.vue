<script>
import axios from "axios";



export const fetchAllCategories = async (categories) => {
  try {
    console.log(import.meta.env.VITE_APIURL)
    const response = await axios.get(import.meta.env.VITE_APIURL + '/api/categories');
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
        `${import.meta.env.VITE_APIURL}/api/categories/${id}`,
        newName
    );
  } catch (error) {
    console.error('Error delete category:', error);
  }
}
</script>

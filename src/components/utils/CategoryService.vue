<script>
import axios from "axios";



export const fetchAllCategories = async (categories) => {
  try {
    const response = await axios.get(import.meta.env.VITE_APIURL + '/api/categories');
    return response.data;
  } catch(error){
    console.error('Error fetching categories:', error);
  }
};
</script>

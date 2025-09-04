<script>

import apiService from "./api";

export const fetchAllCategories = async (categories) => {
  try {
    const response = await apiService.get('/api/categories');
    return response.data;
  } catch(error){
    console.error('Error fetching categories:', error);
  }
};
</script>

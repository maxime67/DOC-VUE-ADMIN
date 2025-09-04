<script>

import apiService from "./api.js"

// Fetch all documents
export const fetchAllDocumentation = async () => {
  try {
    const response = await apiService.get('/api/documentation/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all data:', error);
  }
}
// Fetch all documentation by id Category
export const fetchByCategory = async (id) => {
  try {
    const response = await apiService.get(`/api/documentation/category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documentation by categories:', error);
  }
}

export const searchByName = async (name) => {
  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Name parameter is required and must be a string');
    }

    // Vérification des caractères non autorisés
    const forbiddenChars = /[\/\\<>:"|?*\x00-\x1f]/;
    const pathTraversal = /\.\.|\/\.|\\\.|\.\//;

    // Retourne une liste vide dans le cas ou des caractère non autorisés sont soumis
    if (forbiddenChars.test(name) || pathTraversal.test(name)) {
      return []
    }

    const response = await apiService.get(`/api/documentation/search/${name}`);
    return response.data;

  } catch (error) {
    console.error('Error fetching documentation by name:', error);
  }
}

</script>

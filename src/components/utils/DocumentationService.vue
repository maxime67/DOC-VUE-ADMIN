<script>
import axios from "axios";

export const fetchAllDocumentation = async () => {
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

export const searchByName = async (name) => {
  try {
    if (!name || typeof name !== 'string') {
      throw new Error('Name parameter is required and must be a string');
    }

    // Vérification des caractères non autorisés
    const forbiddenChars = /[\/\\<>:"|?*\x00-\x1f]/;
    const pathTraversal = /\.\.|\/\.|\\\.|\.\//;

    if (forbiddenChars.test(name) || pathTraversal.test(name)) {
      return []
    }

    const response = await axios.get(
        import.meta.env.VITE_APIURL + `/api/documentation/search/${name}`,
    );
    return response.data;

  } catch (error) {
    console.error('Error fetching documenattion by name:', error);
  }
}

</script>

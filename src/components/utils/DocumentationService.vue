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

export const fetchDocumentationById = async (id) => {
  try {
    const response = await axios.get(
        import.meta.env.VITE_APIURL + `/api/documentation/` + id,
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

export const updateDocumentation = async (id, newDocument) => {
  try {
    const response = await axios.put(
        import.meta.env.VITE_APIURL + `/api/documentation/${id}`,
        newDocument
    );
    return response.data;
  } catch (error) {
    console.error('Error updating documentation :', error);
  }
}
export const createDocumentation = async (newDocument) => {
  try {
    const response = await axios.post(
        import.meta.env.VITE_APIURL + `/api/documentation/`,
        newDocument
    );
    return response.data;
  } catch (error) {
    console.error('Error during creation documentation :', error);
  }
}

export const searchByName = async (name) => {
  try {
    const response = await axios.get(
        import.meta.env.VITE_APIURL + `/api/documentation/search/${name}`,
    );
    return response.data;

  } catch (error) {
    console.error('Error fetching documenattion by name:', error);
  }
}


export const deleteDocumentation = async (id) => {
  try {
    await axios.delete(
        import.meta.env.VITE_APIURL + `/api/documentation/${id}`,
    );
    location.reload()
  } catch (error) {
    console.error('Error delete documentation:', error);
  }
}

</script>

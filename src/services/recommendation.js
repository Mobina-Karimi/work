const getRecommendations = async (query) => {
    try {
      const response = await api.get(`recommendations?query=${query}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      throw new Error('Error fetching recommendations');
    }
  };
  
  export { getRecommendations };
  
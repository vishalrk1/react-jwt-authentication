export const getCategoriesData = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/get-categories/", {
      method: "GET",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Categories Data: ", data);
      return data.category_objects;
    }
  } catch (e) {
    throw new Error(`Error in fetching categories: ${e}`);
  }
};

export const getIndividualCategory = (catId, categoriesData) => {
    const catObj = categoriesData.filter((item) => item.cat_id === catId);
    return catObj[0];
}
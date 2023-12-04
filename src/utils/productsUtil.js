export const fetchProducts = async (cat_id) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/get-products/", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cat_id }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("products Data", data);
    } else {
      throw new Error("Products not fetched server error");
    }
  } catch (e) {
    console.log(`Error in fetching products: ${e}`);
  }
};
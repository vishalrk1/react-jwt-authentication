import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/pages/category-products-page.css";
import { ProductsContext } from "../providers/productsProvider";
import { getIndividualCategory } from "../utils/categoriesUtil";
import { CategoriesContext } from "../providers/categoriesProvider";
import DefaultButton from "../components/default-button";

const CategoryProductsPage = () => {
  const { cat_id } = useParams();
  const { productsData, fetchProducts, isProdFetching } =
    useContext(ProductsContext);
  const { categoriesData } = useContext(CategoriesContext);
  const [catObj, setCatObj] = useState(undefined);

  useEffect(() => {
    fetchProducts(cat_id);
    if (categoriesData) {
      const individulaCat = getIndividualCategory(cat_id, categoriesData);
      setCatObj(individulaCat);
    }
  }, [cat_id]);

  return (
    <>
      {catObj && (
        <div className="cat-products-main">
          <div className="banner-container">
            <img
              src={catObj.cat_image_url}
              alt="category-banner"
              className="banner-image"
            />
          </div>
          <div className="product-cards-container">
            {productsData &&
              productsData.map((product) => (
                <div className="card-body">
                  <div className="product-image-container">
                    <img
                      src={product.prod_image_url}
                      alt="prod-id"
                      className="product-image"
                    />
                  </div>
                  <p className="product-title">{product.prod_title}</p>
                  <div className="price-container">
                    <p className="product-price-old">{`₹ ${product.prod_old_price}`}</p>
                    <p className="product-price-new">{`₹ ${product.prod_price}`}</p>
                  </div>
                  <div className="btn-container">
                    <DefaultButton>Add to cart</DefaultButton>
                    <DefaultButton>Wishlist</DefaultButton>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryProductsPage;

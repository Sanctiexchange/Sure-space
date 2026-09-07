const VENDOR_PRODUCTS_KEY = "naijaMarketVendorProducts";

export function getVendorProducts() {
  try {
    const savedProducts = localStorage.getItem(
      VENDOR_PRODUCTS_KEY
    );

    if (!savedProducts) {
      return [];
    }

    return JSON.parse(savedProducts);
  } catch (error) {
    console.error(
      "Error loading vendor products:",
      error
    );

    return [];
  }
}

export function saveVendorProducts(products) {
  try {
    localStorage.setItem(
      VENDOR_PRODUCTS_KEY,
      JSON.stringify(products)
    );
  } catch (error) {
    console.error(
      "Error saving vendor products:",
      error
    );
  }
}

export function addVendorProduct(product) {
  const currentProducts = getVendorProducts();

  const updatedProducts = [
    ...currentProducts,
    product,
  ];

  saveVendorProducts(updatedProducts);

  return updatedProducts;
}

export function deleteVendorProduct(productId) {
  const currentProducts = getVendorProducts();

  const updatedProducts = currentProducts.filter(
    (product) => product.id !== Number(productId)
  );

  saveVendorProducts(updatedProducts);

  return updatedProducts;
}
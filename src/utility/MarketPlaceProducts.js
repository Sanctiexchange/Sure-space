import products from "../data/products";
import { getVendorProducts } from "./ProductStorage";

export function getMarketplaceProducts() {
  const vendorProducts = getVendorProducts();

  // Only vendor products approved by admin
  // are allowed into the marketplace.
  const approvedVendorProducts = vendorProducts.filter(
    (product) =>
      product.approvalStatus === "approved"
  );

  return [
    ...products,
    ...approvedVendorProducts,
  ];
}
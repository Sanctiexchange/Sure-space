import products from "../data/products";
import { getVendorProducts } from "./productStorage";

export function getMarketplaceProducts() {
  const vendorProducts = getVendorProducts();

  return [
    ...products,
    ...vendorProducts,
  ];
}
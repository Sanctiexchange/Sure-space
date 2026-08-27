import HeroSection from "../components/hero/HeroSection"
import CategorySection from "../components/categories/CategorySection"
import ProductSection from "../components/products/ProductSection"
import { Toaster } from "react-hot-toast";

function Home() {
  return (
    <div>
      <Toaster position= "top-right"/>

      <HeroSection />

      <CategorySection />

      <ProductSection />

    </div>
  )
}

export default Home
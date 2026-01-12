import Canvas from "./components/Canvas";
import DetailsSection from "./components/DetailsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

export default function ThreeJsCan(){
    return(
        <div className="min-h-screen w-full bg-white overflow-y-scroll overflow-x-hidden">
            <Canvas />
            <HeroSection />
            <DetailsSection />
            <Footer />
        </div>
    )
}
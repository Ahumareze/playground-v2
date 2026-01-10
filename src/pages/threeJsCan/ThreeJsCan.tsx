import Canvas from "./components/Canvas";
import HeroSection from "./components/HeroSection";

export default function ThreeJsCan(){
    return(
        <div className="min-h-screen w-full bg-white overflow-y-scroll overflow-x-hidden">
            <HeroSection />
            <Canvas />
        </div>
    )
}
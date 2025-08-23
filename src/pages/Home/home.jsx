import TopDoctors from "../../Components/Hero/topDoctors";
import FindBySpeciality from "../../Components/Hero/findBySpeciality";
import HeroSection from "../../Components/Hero/heroSection";
import WhatMakesUsBest from "../../Components/Hero/WhatMakesUsBest";
import Footer from "../../Components/Hero/footer";


function Home()
{
    return (
        <div>
            <HeroSection />
            <FindBySpeciality/>
            <TopDoctors />
            <WhatMakesUsBest/>
            <Footer/>
        </div>
    );
}

export default Home;
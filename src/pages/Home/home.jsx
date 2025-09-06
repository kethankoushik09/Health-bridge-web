import TopDoctors from "../../Components/Hero/topDoctors.jsx";
import FindBySpeciality from "../../Components/Hero/findBySpeciality.jsx";
import HeroSection from "../../Components/Hero/heroSection.jsx";
import WhatMakesUsBest from "../../Components/Hero/WhatMakesUsBest.jsx";
import Footer from "../../Components/Hero/footer.jsx";


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
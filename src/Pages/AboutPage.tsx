import Intro from "../components/about/Intro"
import Testimonials from "../components/about/Testimonials"
import { Footer } from "../components/footer/Footer"
import Navbar from "../components/nav/Navbar"


export const AboutPage = () => {
    return (
        <div>
            <Navbar />
            <Intro />
            <Testimonials />
            <Footer />
        </div>
    )
}

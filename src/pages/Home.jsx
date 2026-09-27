import '../styles/App.css'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Programs from '../components/Programs.jsx'
import Resources from '../components/Resources.jsx'
import HowItWorks from "../components/HowItWorks.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import FAQ from "../components/FAQ.jsx"
import CTA from "../components/CTA.jsx"
import Footer from "../components/Footer.jsx"

export default function App() {
	return (
		<>
			<Navbar />
			<Hero />
			<About />
			<Programs />
			<Resources />
			<HowItWorks />
			<WhyChooseUs />
			<FAQ />
			<CTA />
			<Footer />
		</>
	)
}

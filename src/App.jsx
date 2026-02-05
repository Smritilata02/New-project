import './index.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'

import Marquee from "./components/Contentblock/marquee";
import ContentBlock from "./components/Contentblock/Contentblock";

import FeaturedWorks from './components/FeaturedWorks/FeaturedWorks'
import PressArticles from './components/PressArticles/PressArticles'
import Testimonials from './components/Testimonials/Testimonials'
import MethodSection from './components/MethodSection/MethodSection'

import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Header />
      <main className="site-container z-1" id="main">
        <div className="page-default" data-router-view="default">
          <div className="visual-view">
            <Hero />

            <ContentBlock />
            <Marquee />
            <FeaturedWorks />
            <PressArticles />
            <Testimonials />
            <MethodSection />

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App

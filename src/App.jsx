import './index.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'

import ClientMarquee from './components/ClientMarquee/ClientMarquee'
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
           
            <ClientMarquee />
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

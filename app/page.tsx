import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ProofBar from '@/components/ProofBar'
import Problem from '@/components/Problem'
import PlatformAdvantage from '@/components/PlatformAdvantage'
import HowItWorks from '@/components/HowItWorks'
import ForBrands from '@/components/ForBrands'
import Comparison from '@/components/Comparison'
import Results from '@/components/Results'
import Stats from '@/components/Stats'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import BrandPartnerModal from '@/components/BrandPartnerModal'
import Loader from '@/components/Loader'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProofBar />
      <Problem />
      <PlatformAdvantage />
      <Results />
      <HowItWorks />
      <ForBrands />
      <Comparison />
      <Stats />
      <FinalCTA />
      <Footer />
      <BrandPartnerModal />
      <Loader />
    </main>
  )
}

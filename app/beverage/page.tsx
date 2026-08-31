import Nav from '@/components/Nav'
import BeverageHero from '@/components/beverage/BeverageHero'
import ProofBar from '@/components/ProofBar'
import Problem from '@/components/Problem'
import PlatformAdvantage from '@/components/PlatformAdvantage'
import HowItWorks from '@/components/HowItWorks'
import ForBrands from '@/components/ForBrands'
import Comparison from '@/components/Comparison'
import BeverageResults from '@/components/beverage/BeverageResults'
import Stats from '@/components/Stats'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import BrandPartnerModal from '@/components/BrandPartnerModal'
import Loader from '@/components/Loader'

export default function BeveragePage() {
  return (
    <main>
      <Nav />
      <BeverageHero />
      <ProofBar />
      <Problem />
      <PlatformAdvantage />
      <BeverageResults />
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

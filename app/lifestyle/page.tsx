import Nav from '@/components/Nav'
import LifestyleHero from '@/components/lifestyle/LifestyleHero'
import ProofBar from '@/components/ProofBar'
import LifestyleProblem from '@/components/lifestyle/LifestyleProblem'
import LifestylePlatformAdvantage from '@/components/lifestyle/LifestylePlatformAdvantage'
import LifestyleResults from '@/components/lifestyle/LifestyleResults'
import LifestyleHowItWorks from '@/components/lifestyle/LifestyleHowItWorks'
import LifestyleForBrands from '@/components/lifestyle/LifestyleForBrands'
import Comparison from '@/components/Comparison'
import Stats from '@/components/Stats'
import LifestyleFinalCTA from '@/components/lifestyle/LifestyleFinalCTA'
import Footer from '@/components/Footer'
import BrandPartnerModal from '@/components/BrandPartnerModal'
import Loader from '@/components/Loader'

export default function LifestylePage() {
  return (
    <main>
      <Nav />
      <LifestyleHero />
      <ProofBar />
      <LifestyleProblem />
      <LifestylePlatformAdvantage />
      <LifestyleResults />
      <LifestyleHowItWorks />
      <LifestyleForBrands />
      <Comparison />
      <Stats />
      <LifestyleFinalCTA />
      <Footer />
      <BrandPartnerModal />
      <Loader />
    </main>
  )
}

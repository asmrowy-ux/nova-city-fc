import { HardHat } from 'lucide-react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function UnderConstruction() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-32 pb-20">
        <HardHat className="w-24 h-24 text-primary mb-6 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          Strona w budowie
        </h1>
        <p className="text-lg text-gray-400 max-w-lg mb-8">
          Ta sekcja została tymczasowo wyłączona lub jest w trakcie przebudowy. Zapraszamy wkrótce!
        </p>
      </div>
      <Footer />
    </div>
  )
}

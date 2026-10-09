import { About } from "@/components/About";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Info />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}

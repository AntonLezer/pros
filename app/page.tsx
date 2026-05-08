import Hero from "./_components/hero";
import Services from "./_components/services";
import BeforeAfter from "./_components/before-after";
import WhyUs from "./_components/why-us";
import Reviews from "./_components/reviews";
import Doctors from "./_components/doctors";
import Booking from "./_components/booking";
import Faq from "./_components/faq";
import Contacts from "./_components/contacts";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <BeforeAfter />
      <WhyUs />
      <Reviews />
      <Doctors />
      <Booking />
      <Faq />
      <Contacts />
    </>
  );
}

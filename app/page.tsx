import Header from "./_components/header";
import Hero from "./_components/hero";
import Services from "./_components/services";
import BeforeAfter from "./_components/before-after";
import WhyUs from "./_components/why-us";
import Reviews from "./_components/reviews";
import Doctors from "./_components/doctors";
import BookingForm from "./_components/booking-form";
import Contacts from "./_components/contacts";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyUs />
        <Reviews />
        <Doctors />

        <section
          id="booking-form"
          aria-labelledby="booking-h2"
          className="bg-brand py-12 text-surface md:py-20"
        >
          <div className="mx-auto w-full max-w-md px-4 md:max-w-3xl md:px-8 md:text-center">
            <h2 id="booking-h2" className="text-2xl font-semibold md:text-3xl">
              Запишіться на прийом вже сьогодні!
            </h2>
            <p className="mt-2 text-sm text-surface/85 md:text-base">
              Залиште заявку і ми зв&apos;яжемося з вами найближчим часом
            </p>
            <div className="mx-auto mt-6 max-w-md text-left">
              <BookingForm />
            </div>
          </div>
        </section>

        <Contacts />
      </main>
      <Footer />
    </>
  );
}

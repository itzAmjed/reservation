import React from "react";
import Layout from "../Layout/Layout.jsx";
import SearchWidget from "../component/Search.jsx";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import { ArrowRight } from "lucide-react";
import HotelCard from "../component/HotelCard.jsx";
import { getFeaturedHotels } from "../data/Hotels.jsx";
import { Shield, Clock, Award, Headphones } from "lucide-react";

const Home = () => {
  const featuredHotels = getFeaturedHotels(); // Replace with actual data fetching logic
  return (
    <>
      <Layout>
        <section className='relative min-h-[90vh] flex items-center justify-center overflow-hidden'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920)",
            }}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background' />

          <div className='container mx-auto px-4 relative z-10'>
            <div className='max-w-4xl mx-auto text-center mb-12'>
              <h1 className='text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 animate-fade-in'>
                Discover the World's Most
                <span className='block text-primary'>Extraordinary Escapes</span>
              </h1>
              <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up'>Experience unparalleled luxury at handpicked destinations. Where every journey becomes an unforgettable story.</p>
            </div>

            <div className='max-w-5xl mx-auto animate-slide-up'>
              <SearchWidget />
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className='py-16 bg-card border-y border-border'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              {[
                { icon: Shield, title: "Best Price Guarantee", desc: "Find it lower, we match it" },
                { icon: Clock, title: "24/7 Support", desc: "Always here to help you" },
                { icon: Award, title: "Curated Selection", desc: "Only the finest hotels" },
                { icon: Headphones, title: "Personal Concierge", desc: "Tailored experiences" },
              ].map((item, i) => (
                <div key={i} className='text-center'>
                  <div className='inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4'>
                    <item.icon className='h-6 w-6 text-primary' />
                  </div>
                  <h3 className='font-serif font-semibold text-foreground mb-1'>{item.title}</h3>
                  <p className='text-sm text-muted-foreground'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Featured Hotels */}
        <section className='py-20'>
          <div className='container mx-auto px-4'>
            <div className='flex items-end justify-between mb-12'>
              <div>
                <h2 className='text-3xl md:text-4xl font-serif font-bold text-foreground mb-3'>Featured Destinations</h2>
                <p className='text-muted-foreground max-w-xl'>Handpicked luxury properties offering exceptional experiences</p>
              </div>
              <Link to='/search'>
                <Button variant='outline' className='hidden md:flex gap-2'>
                  View All
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {featuredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            <div className='mt-8 text-center md:hidden'>
              <Link to='/search'>
                <Button variant='outline' className='gap-2'>
                  View All Hotels
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className='py-20 bg-card border-y border-border'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-serif font-bold text-foreground mb-4'>Ready for Your Next Adventure?</h2>
            <p className='text-muted-foreground max-w-xl mx-auto mb-8'>Let our travel experts craft your perfect luxury escape</p>
            <Link to='/contact'>
              <Button size='lg' className='gap-2'>
                Contact Us Today
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;

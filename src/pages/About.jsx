import { Layout } from "@/Layout/layout.jsx";
import { Award, Users, Globe, Heart } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className='relative py-24 overflow-hidden'>
        <div className='absolute inset-0 bg-cover bg-center' style={{ backgroundImage: "url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920)" }} />
        <div className='absolute inset-0 bg-background/80' />
        <div className='container mx-auto px-4 relative z-10 text-center'>
          <h1 className='text-4xl md:text-5xl font-serif font-bold text-foreground mb-4'>About Aurelia Travel</h1>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>Crafting extraordinary journeys for discerning travelers since 2010</p>
        </div>
      </section>

      {/* Story */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-3xl font-serif font-bold text-foreground mb-6'>Our Story</h2>
            <p className='text-muted-foreground leading-relaxed mb-6'>
              Founded with a passion for exceptional travel experiences, Aurelia Travel has grown from a boutique agency to a globally recognized luxury travel curator. We believe that travel should be transformative, creating memories that last a lifetime.
            </p>
            <p className='text-muted-foreground leading-relaxed'>Our team of expert travel consultants personally visit every property we recommend, ensuring that only the finest establishments earn a place in our collection.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className='py-16 bg-card border-y border-border'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {[
              { icon: Globe, value: "50+", label: "Destinations" },
              { icon: Users, value: "25K+", label: "Happy Travelers" },
              { icon: Award, value: "15+", label: "Industry Awards" },
              { icon: Heart, value: "98%", label: "Satisfaction Rate" },
            ].map((stat, i) => (
              <div key={i} className='text-center'>
                <stat.icon className='h-8 w-8 text-primary mx-auto mb-4' />
                <div className='text-3xl font-serif font-bold text-foreground mb-1'>{stat.value}</div>
                <div className='text-muted-foreground'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-serif font-bold text-foreground text-center mb-12'>Our Values</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              { title: "Excellence", desc: "We never compromise on quality, ensuring every detail exceeds expectations." },
              { title: "Authenticity", desc: "We create genuine connections with local cultures and communities." },
              { title: "Personalization", desc: "Every journey is tailored to your unique preferences and dreams." },
            ].map((value, i) => (
              <div key={i} className='text-center p-6'>
                <h3 className='text-xl font-serif font-semibold text-foreground mb-3'>{value.title}</h3>
                <p className='text-muted-foreground'>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;

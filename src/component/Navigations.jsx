import { Link} from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu,Calendar, Phone } from 'lucide-react';
import { useState } from 'react';


const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Search', href: '/search' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

 const Navigations = () => {
  const [isOpen, setIsOpen] = useState(false);
 

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-serif font-bold text-primary">
              Aurelia
            </span>
            <span className="text-xs md:text-sm text-muted-foreground tracking-widest uppercase">
              Travel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary $`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/reservations">
              <Button variant="ghost" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                My Reservations
              </Button>
            </Link>
            <Button variant="default" size="sm" className="gap-2">
              <Phone className="h-4 w-4" />
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" className="flex items-center gap-2 mb-4 ml-2">
                  <span className="text-2xl font-serif font-bold text-primary">
                    Aurelia
                  </span>
                  <span className="text-xs text-muted-foreground tracking-widest uppercase">
                    Travel
                  </span>
                </Link>

                <nav className="flex items-center flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium tracking-wide transition-colors hover:text-primary `}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex flex-col gap-3 mt-4">
                  <Link to="/reservations"  onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className=" w-full gap-2">
                      <Calendar className="h-4 w-4" />
                      My Reservations
                    </Button>
                  </Link>
                  <Button variant="default" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Book Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigations;
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/Layout/Layout.jsx";
import { HotelCard } from "@/component/HotelCard";
import { SearchWidget } from "@/component/Search";
import { hotels, searchHotels, AMENITIES } from "@/data/Hotels.jsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal, Star, X } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [starRating, setStarRating] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const destination = searchParams.get("destination") || "";

  useEffect(() => {
    let results = searchHotels({
      destination,
      priceRange,
      starRating,
      amenities: selectedAmenities,
    });

    // Sort results
    switch (sortBy) {
      case "price-low":
        results = results.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case "price-high":
        results = results.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case "rating":
        results = results.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredHotels(results);
  }, [destination, priceRange, starRating, selectedAmenities, sortBy]);

  const toggleStarRating = (stars) => {
    setStarRating((prev) => (prev.includes(stars) ? prev.filter((s) => s !== stars) : [...prev, stars]));
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]));
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setStarRating([]);
    setSelectedAmenities([]);
    setSortBy("popularity");
  };

  const FilterContent = () => (
    <div className='space-y-8'>
      {/* Price Range */}
      <div>
        <h3 className='font-serif font-semibold text-foreground mb-4'>Price Range</h3>
        <Slider value={priceRange} onValueChange={(value) => setPriceRange(value)} min={0} max={5000} step={100} className='mb-2' />
        <div className='flex justify-between text-sm text-muted-foreground'>
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}+</span>
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <h3 className='font-serif font-semibold text-foreground mb-4'>Star Rating</h3>
        <div className='space-y-3'>
          {[5, 4, 3].map((stars) => (
            <div key={stars} className='flex items-center gap-3'>
              <Checkbox checked={starRating.includes(stars)} onCheckedChange={() => toggleStarRating(stars)} />
              <div className='flex items-center gap-1'>
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className='h-4 w-4 fill-primary text-primary' />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className='font-serif font-semibold text-foreground mb-4'>Amenities</h3>
        <div className='space-y-3 max-h-60 overflow-y-auto'>
          {AMENITIES.map((amenity) => (
            <div key={amenity} className='flex items-center gap-3'>
              <Checkbox checked={selectedAmenities.includes(amenity)} onCheckedChange={() => toggleAmenity(amenity)} />
              <span className='text-sm text-muted-foreground'>{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      <Button variant='outline' onClick={clearFilters} className='w-full'>
        <X className='h-4 w-4 mr-2' />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <section className='py-30'>
        <div className='container mx-auto px-4'>
          <SearchWidget />
        </div>
      </section>

      <section className=''>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row gap-8'>
            {/* Desktop Filters */}
            <aside className='hidden lg:block w-72 flex-shrink-0'>
              <div className='bg-card border border-border rounded-xl p-6 sticky top-24'>
                <h2 className='text-xl font-serif font-bold text-foreground mb-6'>Filters</h2>
                <FilterContent />
              </div>
            </aside>

            {/* Results */}
            <div className='flex-1'>
              <div className='flex items-center justify-between mb-6'>
                <p className='text-muted-foreground'>
                  <span className='text-foreground font-semibold'>{filteredHotels.length}</span> hotels found
                  {destination && <span> in "{destination}"</span>}
                </p>

                <div className='flex items-center gap-4'>
                  {/* Mobile Filter Button */}
                  <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant='outline' className='lg:hidden gap-2'>
                        <SlidersHorizontal className='h-4 w-4' />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className='w-[300px] bg-background'>
                      <h2 className='text-xl font-serif font-bold text-foreground mb-6'>Filters</h2>
                      <FilterContent />
                    </SheetContent>
                  </Sheet>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Sort by' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='popularity'>Popularity</SelectItem>
                      <SelectItem value='price-low'>Price: Low to High</SelectItem>
                      <SelectItem value='price-high'>Price: High to Low</SelectItem>
                      <SelectItem value='rating'>Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>

              {filteredHotels.length === 0 && (
                <div className='text-center py-16'>
                  <h3 className='text-xl font-serif font-semibold text-foreground mb-2'>No hotels found</h3>
                  <p className='text-muted-foreground mb-4'>Try adjusting your filters or search criteria</p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SearchPage;

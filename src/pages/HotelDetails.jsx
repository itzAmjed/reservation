import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/Layout/Layout.jsx";
import { getHotelById } from "@/data/Hotels.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Wifi, Car, Waves, Dumbbell, Users, Bed, Maximize, Check, ArrowLeft } from "lucide-react";

const amenityIcons = {
  "Free WiFi": Wifi,
  "Free Parking": Car,
  "Swimming Pool": Waves,
  "Fitness Center": Dumbbell,
};

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = getHotelById(id || "");
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);

  if (!hotel) {
    return (
      <Layout>
        <div className='container mx-auto px-4 py-20 text-center'>
          <h1 className='text-2xl font-serif font-bold mb-4'>Hotel not found</h1>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </Layout>
    );
  }

  const handleBookNow = () => {
    if (selectedRoom) {
      navigate(`/booking/${hotel.id}?room=${selectedRoom}`);
    }
  };

  return (
    <Layout>
      <div className='container mx-auto px-4 py-8'>
        {/* Back Button */}
        <Button variant='ghost' onClick={() => navigate(-1)} className='mb-6 gap-2'>
          <ArrowLeft className='h-4 w-4' />
          Back
        </Button>

        {/* Image Gallery */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8'>
          <div className='aspect-[4/3] rounded-xl overflow-hidden'>
            <img src={hotel.images[selectedImage]} alt={hotel.name} className='w-full h-full object-cover' />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {hotel.images.slice(0, 4).map((image, index) => (
              <div key={index} className={`aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all ${selectedImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`} onClick={() => setSelectedImage(index)}>
                <img src={image} alt='' className='w-full h-full object-cover' />
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Header */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className='h-4 w-4 fill-primary text-primary' />
                ))}
              </div>
              <h1 className='text-3xl md:text-4xl font-serif font-bold text-foreground mb-2'>{hotel.name}</h1>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <MapPin className='h-4 w-4' />
                {hotel.location}, {hotel.city}, {hotel.country}
              </div>
            </div>

            <Tabs defaultValue='overview'>
              <TabsList>
                <TabsTrigger value='overview'>Overview</TabsTrigger>
                <TabsTrigger value='rooms'>Rooms</TabsTrigger>
                <TabsTrigger value='reviews'>Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value='overview' className='space-y-6 mt-6'>
                <p className='text-muted-foreground leading-relaxed'>{hotel.longDescription}</p>

                <div>
                  <h3 className='text-xl font-serif font-semibold mb-4'>Amenities</h3>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {hotel.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || Check;
                      return (
                        <div key={amenity} className='flex items-center gap-3'>
                          <Icon className='h-5 w-5 text-primary' />
                          <span className='text-muted-foreground'>{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='rooms' className='space-y-4 mt-6'>
                {hotel.roomTypes.map((room) => (
                  <Card key={room.id} className={`cursor-pointer transition-all ${selectedRoom === room.id ? "border-primary" : "border-border hover:border-primary/50"}`} onClick={() => setSelectedRoom(room.id)}>
                    <CardContent className='p-4'>
                      <div className='flex flex-col md:flex-row gap-4'>
                        <img src={room.images[0]} alt={room.name} className='w-full md:w-40 h-32 object-cover rounded-lg' />
                        <div className='flex-1'>
                          <h4 className='text-lg font-serif font-semibold mb-2'>{room.name}</h4>
                          <p className='text-sm text-muted-foreground mb-3'>{room.description}</p>
                          <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
                            <span className='flex items-center gap-1'>
                              <Users className='h-4 w-4' /> {room.maxGuests} guests
                            </span>
                            <span className='flex items-center gap-1'>
                              <Bed className='h-4 w-4' /> {room.bedType}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Maximize className='h-4 w-4' /> {room.size} m²
                            </span>
                          </div>
                        </div>
                        <div className='text-right'>
                          <div className='text-2xl font-serif font-bold text-primary'>${room.pricePerNight}</div>
                          <div className='text-sm text-muted-foreground'>per night</div>
                          {!room.available && <Badge variant='destructive'>Sold Out</Badge>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value='reviews' className='space-y-4 mt-6'>
                {hotel.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className='p-4'>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center'>
                          <span className='text-primary font-semibold'>{review.userName.charAt(0)}</span>
                        </div>
                        <div>
                          <div className='font-semibold'>{review.userName}</div>
                          <div className='flex items-center gap-1'>
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className='h-3 w-3 fill-primary text-primary' />
                            ))}
                          </div>
                        </div>
                      </div>
                      <h4 className='font-semibold mb-2'>{review.title}</h4>
                      <p className='text-muted-foreground'>{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div>
            <Card className='sticky top-24'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <div>
                    <span className='text-3xl font-serif font-bold text-primary'>${hotel.pricePerNight}</span>
                    <span className='text-muted-foreground'>/night</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='bg-primary/20 text-primary font-medium px-2 py-1 rounded'>{hotel.rating}</span>
                  </div>
                </div>

                <Button onClick={handleBookNow} disabled={!selectedRoom} className='w-full' size='lg'>
                  {selectedRoom ? "Book Now" : "Select a Room"}
                </Button>

                {!selectedRoom && <p className='text-sm text-muted-foreground text-center mt-3'>Please select a room type to continue</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HotelDetails;

import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/Layout/layout.jsx";
import { getHotelById } from "@/data/hotels.jsx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

const Booking = () => {
  const { hotelId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hotel = getHotelById(hotelId || "");
  const roomId = searchParams.get("room");
  const room = hotel?.roomTypes.find((r) => r.id === roomId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    agreeTerms: false,
  });

  if (!hotel || !room) {
    return (
      <Layout>
        <div className='container mx-auto px-4 py-20 text-center'>
          <h1 className='text-2xl font-serif font-bold mb-4'>Booking information not found</h1>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </Layout>
    );
  }

  const nights = 3;
  const subtotal = room.pricePerNight * nights;
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    const reservation = {
      id: `RES-${Date.now()}`,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.images[0],
      roomType: room.name,
      checkIn: new Date().toISOString(),
      checkOut: new Date(Date.now() + nights * 24 * 60 * 60 * 1000).toISOString(),
      guests: 2,
      totalPrice: total,
      status: "upcoming",
      guestInfo: formData,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("reservations") || "[]");
    localStorage.setItem("reservations", JSON.stringify([...existing, reservation]));

    toast.success("Reservation confirmed!");
    navigate("/reservations");
  };

  return (
    <Layout>
      <div className='container mx-auto px-4 py-8'>
        <Button variant='ghost' onClick={() => navigate(-1)} className='mb-6 gap-2'>
          <ArrowLeft className='h-4 w-4' />
          Back
        </Button>

        <h1 className='text-3xl font-serif font-bold text-foreground mb-8'>Complete Your Booking</h1>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-2'>
            <form onSubmit={handleSubmit}>
              <Card className='mb-6'>
                <CardHeader>
                  <CardTitle className='font-serif'>Guest Information</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input id='firstName' value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    </div>
                    <div>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input id='lastName' value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input id='email' type='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor='phone'>Phone</Label>
                    <Input id='phone' type='tel' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                  <div>
                    <Label htmlFor='specialRequests'>Special Requests</Label>
                    <Textarea id='specialRequests' value={formData.specialRequests} onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })} placeholder='Any special requests...' />
                  </div>
                </CardContent>
              </Card>

              <Card className='mb-6'>
                <CardHeader>
                  <CardTitle className='font-serif'>Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex items-start gap-3'>
                    <Checkbox id='terms' checked={formData.agreeTerms} onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked })} />
                    <Label htmlFor='terms' className='text-sm text-muted-foreground'>
                      I agree to the terms and conditions, cancellation policy, and privacy policy.
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <Button type='submit' size='lg' className='w-full gap-2'>
                <Check className='h-4 w-4' />
                Confirm Reservation
              </Button>
            </form>
          </div>

          <div>
            <Card className='sticky top-24'>
              <CardHeader>
                <CardTitle className='font-serif'>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-4'>
                  <img src={hotel.images[0]} alt={hotel.name} className='w-24 h-20 object-cover rounded-lg' />
                  <div>
                    <h3 className='font-semibold'>{hotel.name}</h3>
                    <p className='text-sm text-muted-foreground'>{room.name}</p>
                  </div>
                </div>

                <Separator />

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>
                      {nights} nights × ${room.pricePerNight}
                    </span>
                    <span>${subtotal}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Taxes & fees</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className='flex justify-between text-lg font-semibold'>
                  <span>Total</span>
                  <span className='text-primary'>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;

import { useState, useEffect } from "react";
import { Layout } from "@/Layout/layout.jsx";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reservations") || "[]");
    setReservations(stored);
  }, []);

  const upcoming = reservations.filter((r) => r.status === "upcoming");
  const past = reservations.filter((r) => r.status === "completed");

  const ReservationCard = ({ reservation }) => (
    <Card className='overflow-hidden'>
      <CardContent className='p-0'>
        <div className='flex flex-col md:flex-row'>
          <img src={reservation.hotelImage} alt={reservation.hotelName} className='w-full md:w-48 h-40 object-cover' />
          <div className='p-4 flex-1'>
            <div className='flex items-start justify-between mb-2'>
              <div>
                <h3 className='text-lg font-serif font-semibold'>{reservation.hotelName}</h3>
                <p className='text-sm text-muted-foreground'>{reservation.roomType}</p>
              </div>
              <Badge variant={reservation.status === "upcoming" ? "default" : "secondary"}>{reservation.status}</Badge>
            </div>
            <div className='flex items-center gap-4 text-sm text-muted-foreground mb-4'>
              <span className='flex items-center gap-1'>
                <Calendar className='h-4 w-4' />
                {format(new Date(reservation.checkIn), "MMM dd")} - {format(new Date(reservation.checkOut), "MMM dd, yyyy")}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-lg font-semibold text-primary'>${reservation.totalPrice.toFixed(2)}</span>
              <span className='text-xs text-muted-foreground'>Ref: {reservation.id}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-serif font-bold text-foreground mb-8'>My Reservations</h1>

        {reservations.length === 0 ? (
          <div className='text-center py-16'>
            <h2 className='text-xl font-serif font-semibold mb-4'>No reservations yet</h2>
            <p className='text-muted-foreground mb-6'>Start planning your next luxury getaway</p>
            <Link to='/search'>
              <Button>Explore Hotels</Button>
            </Link>
          </div>
        ) : (
          <Tabs defaultValue='upcoming'>
            <TabsList>
              <TabsTrigger value='upcoming'>Upcoming ({upcoming.length})</TabsTrigger>
              <TabsTrigger value='past'>Past ({past.length})</TabsTrigger>
            </TabsList>
            <TabsContent value='upcoming' className='space-y-4 mt-6'>
              {upcoming.map((res) => (
                <ReservationCard key={res.id} reservation={res} />
              ))}
              {upcoming.length === 0 && <p className='text-muted-foreground text-center py-8'>No upcoming reservations</p>}
            </TabsContent>
            <TabsContent value='past' className='space-y-4 mt-6'>
              {past.map((res) => (
                <ReservationCard key={res.id} reservation={res} />
              ))}
              {past.length === 0 && <p className='text-muted-foreground text-center py-8'>No past reservations</p>}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Reservations;

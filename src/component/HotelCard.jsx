import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';



 export const HotelCard = ({ hotel }) => {
  return (
    <Link to={`/hotel/${hotel.id}`}>
      <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-luxury">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {hotel.originalPrice && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              Save {Math.round((1 - hotel.pricePerNight / hotel.originalPrice) * 100)}%
            </Badge>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>
        <CardContent className="p-5">
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-primary text-primary" />
            ))}
          </div>
          <h3 className="text-lg font-serif font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
            <MapPin className="h-3 w-3" />
            {hotel.city}, {hotel.country}
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {hotel.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-primary/20 text-primary text-sm font-medium px-2 py-1 rounded">
                {hotel.rating}
              </span>
              <span className="text-muted-foreground text-sm">Excellent</span>
            </div>
            <div className="text-right">
              {hotel.originalPrice && (
                <span className="text-muted-foreground text-sm line-through mr-2">
                  ${hotel.originalPrice}
                </span>
              )}
              <span className="text-xl font-serif font-bold text-primary">
                ${hotel.pricePerNight}
              </span>
              <span className="text-muted-foreground text-sm">/night</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HotelCard;
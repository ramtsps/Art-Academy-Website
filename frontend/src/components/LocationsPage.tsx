import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function LocationsPage() {
  const locations = [
    {
      name: 'Downtown Arts Center',
      address: '123 Main Street',
      city: 'Seattle, WA 98101',
      phone: '(206) 555-0123',
      email: 'downtown@primiyasart.com',
      hours: 'Mon-Sat: 9am-7pm, Sun: 10am-5pm',
      featured: true,
    },
    {
      name: 'Eastside Creative Studio',
      address: '456 Lake Avenue',
      city: 'Bellevue, WA 98004',
      phone: '(425) 555-0124',
      email: 'eastside@primiyasart.com',
      hours: 'Mon-Sat: 9am-7pm, Sun: Closed',
      featured: false,
    },
    {
      name: 'North End Art Space',
      address: '789 Pine Street',
      city: 'Seattle, WA 98109',
      phone: '(206) 555-0125',
      email: 'northend@primiyasart.com',
      hours: 'Mon-Fri: 10am-6pm, Sat-Sun: 9am-5pm',
      featured: false,
    },
    {
      name: 'South Bay Gallery',
      address: '321 Ocean Drive',
      city: 'Tacoma, WA 98402',
      phone: '(253) 555-0126',
      email: 'southbay@primiyasart.com',
      hours: 'Tue-Sat: 10am-6pm, Sun-Mon: Closed',
      featured: false,
    },
    {
      name: 'West Hills Studio',
      address: '654 Summit Road',
      city: 'Redmond, WA 98052',
      phone: '(425) 555-0127',
      email: 'westhills@primiyasart.com',
      hours: 'Mon-Sat: 9am-8pm, Sun: 10am-4pm',
      featured: true,
    },
    {
      name: 'University District Hub',
      address: '987 College Way',
      city: 'Seattle, WA 98105',
      phone: '(206) 555-0128',
      email: 'university@primiyasart.com',
      hours: 'Mon-Sat: 8am-7pm, Sun: 10am-6pm',
      featured: false,
    },
    {
      name: 'Capitol Hill Creative',
      address: '147 Broadway Ave',
      city: 'Seattle, WA 98102',
      phone: '(206) 555-0129',
      email: 'capitolhill@primiyasart.com',
      hours: 'Mon-Sat: 10am-7pm, Sun: 11am-5pm',
      featured: false,
    },
    {
      name: 'Fremont Art House',
      address: '258 Fremont Avenue',
      city: 'Seattle, WA 98103',
      phone: '(206) 555-0130',
      email: 'fremont@primiyasart.com',
      hours: 'Tue-Sat: 9am-6pm, Sun-Mon: Closed',
      featured: false,
    },
    {
      name: 'Ballard Creative Center',
      address: '369 Market Street',
      city: 'Seattle, WA 98107',
      phone: '(206) 555-0131',
      email: 'ballard@primiyasart.com',
      hours: 'Mon-Sat: 9am-7pm, Sun: 10am-5pm',
      featured: true,
    },
    {
      name: 'Green Lake Studio',
      address: '741 Woodland Way',
      city: 'Seattle, WA 98115',
      phone: '(206) 555-0132',
      email: 'greenlake@primiyasart.com',
      hours: 'Mon-Fri: 10am-6pm, Sat-Sun: 9am-5pm',
      featured: false,
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Our Locations</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Find a Primiya's Art studio near you
          </p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <p className="text-xl text-gray-600">Interactive Map Coming Soon</p>
                <p className="text-gray-500">View all 10 locations below</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <Card
              key={index}
              className={`overflow-hidden hover:shadow-xl transition-shadow ${
                location.featured ? 'border-2 border-purple-600' : ''
              }`}
            >
              <div className="h-48 relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758627506826-0658170e5cf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdHVkaW8lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE0OTc2NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
                {location.featured && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl mb-4">{location.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <div>{location.address}</div>
                      <div>{location.city}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <a href={`tel:${location.phone}`} className="hover:text-purple-600">
                      {location.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <a href={`mailto:${location.email}`} className="hover:text-purple-600 break-all">
                      {location.email}
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-3 text-gray-600">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>{location.hours}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    Visit Us
                  </Button>
                  <Button variant="outline" className="flex-1 border-purple-600 text-purple-600 hover:bg-purple-50">
                    Call Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl mb-4">Can't Find a Location Near You?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                We're always expanding! Let us know if you'd like to see Primiya's Art in your neighborhood.
              </p>
              <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
                Request a Location
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

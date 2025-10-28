import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Users, ArrowRight } from 'lucide-react';

export function FeaturedPrograms() {
  const programs = [
    {
      title: 'Acrylic Painting',
      description: 'Master the vibrant world of acrylic paints with hands-on techniques and creative projects.',
      image: 'https://images.unsplash.com/photo-1614900157270-a0c14fadaeaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwcGFpbnRpbmclMjBjYW52YXN8ZW58MXx8fHwxNzYxNTg1NDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '7-12 years',
      duration: '8 weeks',
      spots: '12',
      badge: 'Popular',
    },
    {
      title: 'Drawing & Sketching',
      description: 'Develop fundamental drawing skills from basic shapes to advanced shading techniques.',
      image: 'https://images.unsplash.com/photo-1761039894388-3ef2606bffbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2V0Y2hpbmclMjBwZW5jaWxzJTIwZHJhd2luZ3xlbnwxfHx8fDE3NjE1ODU0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '6-10 years',
      duration: '10 weeks',
      spots: '15',
      badge: 'Beginner Friendly',
    },
    {
      title: 'Sculpture & 3D Art',
      description: 'Bring your imagination to life with clay modeling, sculpting, and 3D art creation.',
      image: 'https://images.unsplash.com/photo-1758522277401-5a11fb4499f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwc2N1bHB0dXJlJTIwYXJ0fGVufDF8fHx8MTc2MTU4NTQ1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '8-13 years',
      duration: '10 weeks',
      spots: '10',
      badge: 'Hands-On',
    },
    {
      title: 'Digital Art',
      description: 'Explore modern art creation with digital tablets and professional design software.',
      image: 'https://images.unsplash.com/photo-1680123586261-b9ea69f1c070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZHJhd2luZyUyMHRhYmxldHxlbnwxfHx8fDE3NjE0OTQxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '10-15 years',
      duration: '8 weeks',
      spots: '12',
      badge: 'Tech Savvy',
    },
    {
      title: 'Watercolor Techniques',
      description: 'Learn the delicate art of watercolor painting with expert guidance and creative freedom.',
      image: 'https://images.unsplash.com/photo-1713815539197-78db123d8f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzYxNDgwNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '7-11 years',
      duration: '8 weeks',
      spots: '15',
      badge: 'New',
    },
    {
      title: 'Mixed Media Art',
      description: 'Combine different materials and techniques to create unique, multi-dimensional artworks.',
      image: 'https://images.unsplash.com/photo-1542978415-64bbba6025c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdXBwbGllcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTU1MjM1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '8-12 years',
      duration: '12 weeks',
      spots: '10',
      badge: 'Creative',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Featured Programs</h2>
          <p className="text-xl text-gray-600">
            Discover our most popular art classes designed for young creators
          </p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {programs.map((program, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                  <div className="relative h-64">
                    <ImageWithFallback
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-600">
                      {program.badge}
                    </Badge>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-2xl mb-3">{program.title}</h3>
                    <p className="text-gray-600 mb-4 min-h-[48px]">{program.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Ages {program.age} • Max {program.spots} students</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{program.duration} program</span>
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 text-lg px-8 py-6">
            View All Programs
          </Button>
        </div>
      </div>
    </div>
  );
}

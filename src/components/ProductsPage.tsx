import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ShoppingCart, Clock, Users, Star } from 'lucide-react';

export function ProductsPage() {
  const classes = [
    {
      title: 'Painting Basics',
      age: '5-7 years',
      duration: '8 weeks',
      price: '$240',
      students: '12 max',
      rating: 4.9,
      description: 'Introduction to watercolors, acrylics, and basic painting techniques.',
      popular: true,
    },
    {
      title: 'Drawing Fundamentals',
      age: '6-9 years',
      duration: '10 weeks',
      price: '$280',
      students: '15 max',
      rating: 4.8,
      description: 'Learn sketching, shading, and perspective drawing.',
      popular: false,
    },
    {
      title: 'Creative Mixed Media',
      age: '8-12 years',
      duration: '12 weeks',
      price: '$320',
      students: '10 max',
      rating: 5.0,
      description: 'Explore collage, printmaking, and experimental art techniques.',
      popular: true,
    },
    {
      title: 'Sculpture & 3D Art',
      age: '9-13 years',
      duration: '10 weeks',
      price: '$340',
      students: '10 max',
      rating: 4.9,
      description: 'Work with clay, paper mache, and other 3D materials.',
      popular: false,
    },
    {
      title: 'Digital Art & Design',
      age: '10-14 years',
      duration: '8 weeks',
      price: '$360',
      students: '12 max',
      rating: 4.7,
      description: 'Introduction to digital drawing tablets and design software.',
      popular: true,
    },
    {
      title: 'Animation Workshop',
      age: '11-15 years',
      duration: '12 weeks',
      price: '$400',
      students: '8 max',
      rating: 5.0,
      description: 'Learn stop-motion and digital animation basics.',
      popular: false,
    },
  ];

  const supplies = [
    {
      name: 'Beginner Art Kit',
      price: '$45',
      items: '20+ items',
      description: 'Everything needed to start painting and drawing.',
    },
    {
      name: 'Premium Paint Set',
      price: '$75',
      items: '36 colors',
      description: 'Professional-grade acrylic paints and brushes.',
    },
    {
      name: 'Sketch Master Pack',
      price: '$35',
      items: '15+ items',
      description: 'Complete sketching and drawing supplies.',
    },
    {
      name: 'Sculpture Starter Kit',
      price: '$60',
      items: '25+ items',
      description: 'Clay, tools, and accessories for 3D art.',
    },
  ];

  const smallGifts = [
    {
      name: 'Mini Art Set',
      price: '$12',
      image: 'https://images.unsplash.com/photo-1744898130445-e6ccb0df1ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHN0YXRpb25lcnklMjBnaWZ0c3xlbnwxfHx8fDE3NjE1ODU3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Compact art kit with crayons, pencils, and mini sketchpad.',
    },
    {
      name: 'Creative Sticker Pack',
      price: '$8',
      image: 'https://images.unsplash.com/photo-1667864811044-b0bcd9ed4a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94JTIwd3JhcHBlZCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTU4NTcwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: '200+ colorful art-themed stickers for decorating.',
    },
    {
      name: 'Watercolor Pocket Set',
      price: '$15',
      image: 'https://images.unsplash.com/photo-1759433581610-801ca7bbd28f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGFydHklMjBnaWZ0c3xlbnwxfHx8fDE3NjE1ODU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Portable watercolor palette with brush and paper.',
    },
    {
      name: 'DIY Keychain Kit',
      price: '$10',
      image: 'https://images.unsplash.com/photo-1760220844423-0b449a6c51be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGZhdm9yJTIwYmFnc3xlbnwxfHx8fDE3NjE1ODU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Create your own artistic keychains with beads and charms.',
    },
    {
      name: 'Art Journal Mini',
      price: '$14',
      image: 'https://images.unsplash.com/photo-1744898130445-e6ccb0df1ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHN0YXRpb25lcnklMjBnaWZ0c3xlbnwxfHx8fDE3NjE1ODU3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Pocket-sized journal for sketches and doodles.',
    },
    {
      name: 'Eraser Collection',
      price: '$6',
      image: 'https://images.unsplash.com/photo-1667864811044-b0bcd9ed4a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94JTIwd3JhcHBlZCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTU4NTcwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Set of 10 fun-shaped artistic erasers.',
    },
  ];

  const returnGifts = [
    {
      name: 'Party Favor Art Bag',
      price: '$18',
      quantity: 'Pack of 10',
      image: 'https://images.unsplash.com/photo-1760220844423-0b449a6c51be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGZhdm9yJTIwYmFnc3xlbnwxfHx8fDE3NjE1ODU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Colorful bags filled with crayons and coloring sheets.',
    },
    {
      name: 'Birthday Bundle',
      price: '$35',
      quantity: 'Pack of 12',
      image: 'https://images.unsplash.com/photo-1759433581610-801ca7bbd28f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGFydHklMjBnaWZ0c3xlbnwxfHx8fDE3NjE1ODU3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Mini paint sets and stickers for birthday parties.',
    },
    {
      name: 'Craft Party Kit',
      price: '$45',
      quantity: 'Pack of 15',
      image: 'https://images.unsplash.com/photo-1667864811044-b0bcd9ed4a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwYm94JTIwd3JhcHBlZCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTU4NTcwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'DIY craft kits perfect for party return gifts.',
    },
    {
      name: 'Drawing Goodie Bags',
      price: '$25',
      quantity: 'Pack of 10',
      image: 'https://images.unsplash.com/photo-1744898130445-e6ccb0df1ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHN0YXRpb25lcnklMjBnaWZ0c3xlbnwxfHx8fDE3NjE1ODU3MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Sketching pencils and mini pads for young artists.',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">Classes & Products</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Discover our range of art classes and premium supplies
          </p>
        </div>
      </div>

      {/* Classes Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Art Classes</h2>
          <p className="text-xl text-gray-600">
            Expert-led programs designed for different age groups and skill levels
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 relative">
                {course.popular && (
                  <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 hover:bg-yellow-400">
                    Popular
                  </Badge>
                )}
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl mb-2">{course.title}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{course.rating}</span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Ages {course.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration} • {course.students}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl text-purple-600">{course.price}</span>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Enroll Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Art Supplies Section */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Art Supplies</h2>
            <p className="text-xl text-gray-600">
              Premium quality materials for young artists
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {supplies.map((supply, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1542978415-64bbba6025c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdXBwbGllcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTU1MjM1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt={supply.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl mb-2">{supply.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{supply.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">{supply.items}</span>
                    <span className="text-2xl text-purple-600">{supply.price}</span>
                  </div>
                  <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Small Gifts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Small Gifts</h2>
          <p className="text-xl text-gray-600">
            Perfect little treasures for budding artists
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {smallGifts.map((gift, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <div className="h-40">
                <ImageWithFallback
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="pt-4">
                <h3 className="text-lg mb-2">{gift.name}</h3>
                <p className="text-sm text-gray-600 mb-3 min-h-[40px]">{gift.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl text-purple-600">{gift.price}</span>
                  <Button size="sm" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                    <ShoppingCart className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Return Gifts Section */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Return Gifts & Party Favors</h2>
            <p className="text-xl text-gray-600">
              Make every celebration extra special with creative return gifts
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnGifts.map((gift, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow bg-white">
                <div className="h-56">
                  <ImageWithFallback
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="pt-6">
                  <Badge className="mb-3 bg-purple-100 text-purple-700 hover:bg-purple-100">
                    {gift.quantity}
                  </Badge>
                  <h3 className="text-xl mb-2">{gift.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{gift.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl text-purple-600">{gift.price}</span>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl mb-4">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of young artists discovering their creative potential
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
                Browse All Classes
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

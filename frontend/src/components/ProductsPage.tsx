import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ShoppingCart, Clock, Users, Star } from 'lucide-react';
import { useCart } from './CartContext';
import { toast } from 'sonner@2.0.3';
import { useEffect, useState } from 'react';


interface Product {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  slug: string;
  price: number;
  items?: string;
  description: string;
  category: string;
  imageUrl?: string | null;
  featured?: boolean | null;
  inStock?: boolean | null;
  stockQuantity?: number | null;
  // For classes
  ageRange?: string;
  duration?: string;
  maxStudents?: string;
  rating?: number;
  popular?: boolean;
  // For gifts
  quantity?: string;
}

interface ProductsPageProps {
  onNavigate?: (page: string) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps = {}) {
  const { addToCart } = useCart();
  
  const [classes, setClasses] = useState<Product[]>([]);
  const [supplies, setSupplies] = useState<Product[]>([]);
  const [smallGifts, setSmallGifts] = useState<Product[]>([]);
  const [returnGifts, setReturnGifts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from your backend API
 useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Use environment variables
      const baseUrl = import.meta.env.VITE_API_URL|| 'http://localhost:5000/api';
      
      const [classesRes, suppliesRes, giftsRes, returnGiftsRes] = await Promise.all([
        fetch(`${baseUrl}/art-classes`),
        fetch(`${baseUrl}/art-supplies`),
        fetch(`${baseUrl}/small-gifts`),
        fetch(`${baseUrl}/return-gifts`)
      ]);

      // Check if responses are ok
      if (!classesRes.ok) throw new Error('Failed to fetch classes');
      if (!suppliesRes.ok) throw new Error('Failed to fetch supplies');
      if (!giftsRes.ok) throw new Error('Failed to fetch gifts');
      if (!returnGiftsRes.ok) throw new Error('Failed to fetch return gifts');

      const classesData = await classesRes.json();
      const suppliesData = await suppliesRes.json();
      const giftsData = await giftsRes.json();
      const returnGiftsData = await returnGiftsRes.json();

      if (classesData.success) setClasses(classesData.data);
      if (suppliesData.success) setSupplies(suppliesData.data);
      if (giftsData.success) setSmallGifts(giftsData.data);
      if (returnGiftsData.success) setReturnGifts(returnGiftsData.data);

    } catch (error) {
      console.error('Error fetching data:', error);
      // You can also show a toast notification to the user
      toast.error('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
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
                <h3 className="text-xl mb-2">{course.name}</h3>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{course.rating}</span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Ages {course.ageRange }</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration} • {course.maxStudents}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl text-purple-600">${course.price}</span>
                  <Button 
                    onClick={() => {
                      addToCart({
                        id: course.id,
                        name: course.name,
                        price: course.price,
                        type: 'program',
                        duration: course.duration,
                        age: course.ageRange ,
                      });
                      toast.success(`${course.name} added to cart!`);
                    }}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
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
              <Card key={index} className="hover:shadow-xl transition-shadow flex flex-col">
                <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1542978415-64bbba6025c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdXBwbGllcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTU1MjM1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt={supply.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6 flex flex-col flex-1">
                  <h3 className="text-xl mb-2">{supply.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{supply.description}</p>
                  <div className="flex items-center justify-between mb-4 pt-3 border-t mt-auto">
                    <span className="text-gray-600">{supply.items}</span>
                    <span className="text-2xl text-purple-600">${supply.price}</span>
                  </div>
                  <Button 
                    onClick={() => {
                      addToCart({
                        id: supply.id,
                        name: supply.name,
                        price: supply.price,
                        type: 'product',
                        category: supply.category,
                      });
                      toast.success(`${supply.name} added to cart!`);
                    }}
                    variant="outline" 
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
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
            <Card key={index} className="hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-40">
                <ImageWithFallback
                  src={gift.imageUrl}
                  alt={gift.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="pt-4 flex flex-col flex-1">
                <h3 className="text-lg mb-2">{gift.name}</h3>
                <p className="text-sm text-gray-600 mb-3 flex-1">{gift.description}</p>
                <div className="flex items-center justify-between pt-3 border-t mt-auto">
                  <span className="text-xl text-purple-600">${gift.price}</span>
                  <Button 
                    onClick={() => {
                      addToCart({
                        id: gift.id,
                        name: gift.name,
                        price: gift.price,
                        type: 'product',
                        category: gift.category,
                      });
                      toast.success(`${gift.name} added to cart!`);
                    }}
                    size="sm" 
                    variant="outline" 
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
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
              <Card key={index} className="hover:shadow-xl transition-shadow bg-white flex flex-col">
                <div className="h-56">
                  <ImageWithFallback
                    src={gift.imageUrl}
                    alt={gift.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="pt-6 flex flex-col flex-1">
                  <Badge className="mb-3 bg-purple-100 text-purple-700 hover:bg-purple-100">
                    {gift.quantity}
                  </Badge>
                  <h3 className="text-xl mb-2">{gift.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{gift.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t mt-auto">
                    <span className="text-2xl text-purple-600">${gift.price}</span>
                    <Button 
                      onClick={() => {
                        addToCart({
                          id: gift.id,
                          name: gift.name,
                          price: gift.price,
                          type: 'product',
                          category: gift.category,
                        });
                        toast.success(`${gift.name} added to cart!`);
                      }}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
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
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none gap-0 overflow-hidden">
          <CardContent className="py-12 px-6 text-center">
            <h2 className="text-3xl mb-4">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join hundreds of young artists discovering their creative potential
            </p>
            <div className="flex gap-4 justify-center items-center">
              <Button 
                onClick={() => onNavigate?.('enrollment')}
                className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6"
              >
                Browse All Classes
              </Button>
              <Button 
                onClick={() => onNavigate?.('contact')}
                className="text-lg px-8 py-6 border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-600 transition-colors"
              >
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

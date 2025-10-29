import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps = {}) {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700">
              <Sparkles className="w-4 h-4" />
              <span>Where Creativity Comes Alive</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl">
              Spark your child's creativity at{' '}
              <span className="text-purple-600">Primiya's art</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-xl">
              Nurture your child's artistic talents with expert-led classes, 
              premium supplies, and a vibrant community of young artists.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                onClick={() => onNavigate?.('enrollment')}
                className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => onNavigate?.('products')}
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                View Classes
              </Button>
            </div>

            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl text-purple-600">500+</div>
                <div className="text-gray-600">Happy Students</div>
              </div>
              <div>
                <div className="text-3xl text-purple-600">50+</div>
                <div className="text-gray-600">Expert Teachers</div>
              </div>
              <div>
                <div className="text-3xl text-purple-600">10+</div>
                <div className="text-gray-600">Locations</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630077852169-3900cc6f4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBhaW50aW5nJTIwYXJ0JTIwY2xhc3N8ZW58MXx8fHwxNzYxNTg0NzgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Children in art class"
                  className="rounded-2xl shadow-xl w-full h-64 object-cover"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1713815539197-78db123d8f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzYxNDgwNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Watercolor painting"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1542978415-64bbba6025c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdXBwbGllcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTU1MjM1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Art supplies"
                  className="rounded-2xl shadow-xl w-full h-48 object-cover"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1611085667203-7efa7c067bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGRyYXdpbmclMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjE1Njg2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Children drawing"
                  className="rounded-2xl shadow-xl w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

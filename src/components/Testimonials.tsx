import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Emma Rodriguez',
      age: 9,
      quote: 'I love coming to art class! My teacher helps me paint the most beautiful rainbows and I made so many new friends. Now I can draw anything I imagine!',
      initials: 'ER',
      color: 'bg-purple-400',
      rating: 5,
    },
    {
      name: 'Lucas Chen',
      age: 11,
      quote: 'The digital art class is amazing! I learned how to use a drawing tablet and created my own comic book character. I want to be an animator when I grow up!',
      initials: 'LC',
      color: 'bg-pink-400',
      rating: 5,
    },
    {
      name: 'Sophia Johnson',
      age: 8,
      quote: 'I was shy at first, but everyone is so nice here. My sculpture of a unicorn won a prize at the art show! I feel like a real artist now.',
      initials: 'SJ',
      color: 'bg-yellow-400',
      rating: 5,
    },
    {
      name: 'Noah Patel',
      age: 10,
      quote: 'Art class is the best part of my week! I love mixing colors and trying new things. My parents put my paintings all over our house!',
      initials: 'NP',
      color: 'bg-blue-400',
      rating: 5,
    },
    {
      name: 'Mia Anderson',
      age: 7,
      quote: 'I made a painting for my grandma and she cried happy tears! The teachers are really nice and help me when I need it. Art is so much fun!',
      initials: 'MA',
      color: 'bg-green-400',
      rating: 5,
    },
    {
      name: 'Ethan Kim',
      age: 12,
      quote: 'The mixed media class taught me that art has no limits. I combined painting, collage, and even 3D elements. My creativity has grown so much!',
      initials: 'EK',
      color: 'bg-orange-400',
      rating: 5,
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">What Our Young Artists Say</h2>
          <p className="text-xl text-gray-600">
            Hear from the creative minds who bring our studios to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow bg-white border-none">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className={`${testimonial.color} text-white text-xl`}>
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl mb-1">{testimonial.name}</h3>
                    <p className="text-gray-600">Age {testimonial.age}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-purple-200 flex-shrink-0" />
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl text-purple-600 mb-2">98%</div>
            <div className="text-gray-600">Student Satisfaction</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Artists</div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl text-purple-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Users, Award, Palette } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Art',
      description: 'We believe every child has an artist within, waiting to be discovered and nurtured.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive environment where young artists can grow and inspire each other.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Providing the highest quality art education with experienced and certified instructors.',
    },
    {
      icon: Palette,
      title: 'Creativity',
      description: 'Encouraging unique expression and innovative thinking through diverse art forms.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Lead Instructor',
      specialty: 'Painting & Mixed Media',
    },
    {
      name: 'Michael Chen',
      role: 'Art Director',
      specialty: 'Sculpture & 3D Art',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Senior Instructor',
      specialty: 'Drawing & Illustration',
    },
    {
      name: 'David Kim',
      role: 'Creative Coordinator',
      specialty: 'Digital Arts',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-6">About Primiya's Art</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Inspiring young minds through art education since 2015
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded by artist and educator Primiya, our academy began as a small 
                community workshop with just 10 students. Today, we've grown into a network of 
                art centers serving over 500 young artists across multiple locations.
              </p>
              <p>
                Our mission has remained the same: to provide a nurturing space where children 
                can explore their creativity, develop artistic skills, and build confidence 
                through self-expression.
              </p>
              <p>
                We believe that art education is not just about learning techniques—it's about 
                fostering critical thinking, problem-solving, and emotional intelligence that 
                will benefit children throughout their lives.
              </p>
            </div>
          </div>
          <div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1642252429939-3f9232959eb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY3JlYXRpdmUlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjE1ODQ3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Art workshop"
              className="rounded-2xl shadow-xl w-full h-96 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl text-center mb-12">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-400"></div>
              <CardContent className="pt-6 text-center">
                <h3 className="text-xl mb-1">{member.name}</h3>
                <p className="text-purple-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.specialty}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">10+</div>
              <div className="opacity-90">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl mb-2">500+</div>
              <div className="opacity-90">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl mb-2">50+</div>
              <div className="opacity-90">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl mb-2">10</div>
              <div className="opacity-90">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

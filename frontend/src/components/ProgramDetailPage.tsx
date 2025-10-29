import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { useCart } from './CartContext';
import { toast } from 'sonner@2.0.3';
import { 
  Clock, 
  Users, 
  Calendar, 
  MapPin, 
  Check, 
  Award,
  Palette,
  BookOpen,
  ArrowLeft,
  Star,
  ShoppingCart
} from 'lucide-react';

interface ProgramDetailPageProps {
  programId: string;
  onBack: () => void;
  onEnroll: (programId: string) => void;
  onNavigate?: (page: string) => void;
}

export function ProgramDetailPage({ programId, onBack, onEnroll, onNavigate }: ProgramDetailPageProps) {
  const { addToCart } = useCart();
  const programsData: { [key: string]: any } = {
    'acrylic-painting': {
      title: 'Acrylic Painting',
      description: 'Master the vibrant world of acrylic paints with hands-on techniques and creative projects.',
      image: 'https://images.unsplash.com/photo-1614900157270-a0c14fadaeaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3J5bGljJTIwcGFpbnRpbmclMjBjYW52YXN8ZW58MXx8fHwxNzYxNTg1NDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '7-12 years',
      duration: '8 weeks',
      spots: '12',
      badge: 'Popular',
      price: '$320',
      schedule: 'Saturdays, 10:00 AM - 12:00 PM',
      rating: 4.9,
      reviews: 127,
      detailedDescription: 'Dive into the exciting world of acrylic painting! This comprehensive program teaches students everything from color mixing and brush techniques to composition and creative expression. Students will work on multiple projects, including still life, landscapes, and abstract art.',
      highlights: [
        'Learn professional color mixing techniques',
        'Master various brush strokes and textures',
        'Complete 6-8 finished paintings',
        'All art supplies included',
        'Small class sizes for personalized attention',
        'Take home all your artwork',
      ],
      curriculum: [
        {
          week: 'Weeks 1-2',
          title: 'Introduction to Acrylics',
          topics: ['Color theory basics', 'Brush handling techniques', 'Canvas preparation', 'Simple shapes and forms'],
        },
        {
          week: 'Weeks 3-4',
          title: 'Color Mixing & Blending',
          topics: ['Primary and secondary colors', 'Creating tints and shades', 'Gradient techniques', 'Color harmony'],
        },
        {
          week: 'Weeks 5-6',
          title: 'Painting Techniques',
          topics: ['Layering and glazing', 'Texture creation', 'Still life painting', 'Composition basics'],
        },
        {
          week: 'Weeks 7-8',
          title: 'Creative Projects',
          topics: ['Landscape painting', 'Abstract art exploration', 'Final masterpiece', 'Art showcase preparation'],
        },
      ],
      whatToBring: [
        'Comfortable clothes that can get messy',
        'Water bottle',
        'Enthusiasm and creativity!',
      ],
      materialsProvided: [
        'Acrylic paints (full color set)',
        'Canvas boards and stretched canvases',
        'Assorted brushes',
        'Palette and mixing tools',
        'Apron or smock',
      ],
    },
    'drawing-sketching': {
      title: 'Drawing & Sketching',
      description: 'Develop fundamental drawing skills from basic shapes to advanced shading techniques.',
      image: 'https://images.unsplash.com/photo-1761039894388-3ef2606bffbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2V0Y2hpbmclMjBwZW5jaWxzJTIwZHJhd2luZ3xlbnwxfHx8fDE3NjE1ODU0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '6-10 years',
      duration: '10 weeks',
      spots: '15',
      badge: 'Beginner Friendly',
      price: '$280',
      schedule: 'Sundays, 2:00 PM - 3:30 PM',
      rating: 4.8,
      reviews: 203,
      detailedDescription: 'Build a strong foundation in drawing with this beginner-friendly program. Students learn essential skills including observation, proportion, perspective, and shading while working with pencils, charcoal, and other drawing media.',
      highlights: [
        'Learn to draw from observation',
        'Master shading and value techniques',
        'Explore different drawing media',
        'Create a personal sketchbook',
        'Age-appropriate instruction',
        'Beginner-friendly approach',
      ],
      curriculum: [
        {
          week: 'Weeks 1-2',
          title: 'Basic Shapes & Lines',
          topics: ['Line control exercises', 'Geometric shapes', 'Simple objects', 'Hand-eye coordination'],
        },
        {
          week: 'Weeks 3-4',
          title: 'Value & Shading',
          topics: ['Light and shadow', 'Pencil pressure control', 'Value scales', '3D form creation'],
        },
        {
          week: 'Weeks 5-6',
          title: 'Proportion & Perspective',
          topics: ['Measuring techniques', 'Basic perspective', 'Size relationships', 'Composition'],
        },
        {
          week: 'Weeks 7-8',
          title: 'Texture & Detail',
          topics: ['Surface textures', 'Detail rendering', 'Various subjects', 'Observational drawing'],
        },
        {
          week: 'Weeks 9-10',
          title: 'Creative Expression',
          topics: ['Personal style development', 'Imagination drawing', 'Final portfolio', 'Art showcase'],
        },
      ],
      whatToBring: [
        'Pencil case or small bag',
        'Eraser (if preferred brand)',
        'Positive attitude!',
      ],
      materialsProvided: [
        'Drawing pencils (various grades)',
        'Sketchbooks',
        'Erasers and blending tools',
        'Charcoal and pastels',
        'Reference materials',
      ],
    },
    'sculpture-3d': {
      title: 'Sculpture & 3D Art',
      description: 'Bring your imagination to life with clay modeling, sculpting, and 3D art creation.',
      image: 'https://images.unsplash.com/photo-1758522277401-5a11fb4499f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGF5JTIwc2N1bHB0dXJlJTIwYXJ0fGVufDF8fHx8MTc2MTU4NTQ1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '8-13 years',
      duration: '10 weeks',
      spots: '10',
      badge: 'Hands-On',
      price: '$360',
      schedule: 'Saturdays, 1:00 PM - 3:00 PM',
      rating: 4.9,
      reviews: 95,
      detailedDescription: 'Experience the joy of creating three-dimensional art! Students explore various sculpting techniques using clay, wire, and mixed media to create amazing sculptures they can take home.',
      highlights: [
        'Work with professional clay',
        'Learn hand-building techniques',
        'Create 5-7 finished sculptures',
        'Introduction to pottery tools',
        'Small group instruction',
        'All materials provided',
      ],
      curriculum: [
        {
          week: 'Weeks 1-2',
          title: 'Clay Basics',
          topics: ['Clay properties', 'Hand-building methods', 'Pinch pots', 'Basic forms'],
        },
        {
          week: 'Weeks 3-4',
          title: 'Sculpting Techniques',
          topics: ['Coil building', 'Slab construction', 'Texture creation', 'Tool usage'],
        },
        {
          week: 'Weeks 5-6',
          title: 'Animal & Figure Sculpting',
          topics: ['Animal forms', 'Character creation', 'Proportions', 'Details and features'],
        },
        {
          week: 'Weeks 7-8',
          title: 'Mixed Media 3D',
          topics: ['Wire sculptures', 'Found object art', 'Relief sculptures', 'Creative assemblage'],
        },
        {
          week: 'Weeks 9-10',
          title: 'Final Projects',
          topics: ['Large-scale sculpture', 'Glazing basics', 'Finishing techniques', 'Exhibition preparation'],
        },
      ],
      whatToBring: [
        'Old clothes or apron',
        'Towel for clean-up',
        'Creative spirit!',
      ],
      materialsProvided: [
        'Modeling clay',
        'Sculpting tools',
        'Wire and armatures',
        'Mixed media materials',
        'Glazes and finishes',
      ],
    },
    'digital-art': {
      title: 'Digital Art',
      description: 'Explore modern art creation with digital tablets and professional design software.',
      image: 'https://images.unsplash.com/photo-1680123586261-b9ea69f1c070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZHJhd2luZyUyMHRhYmxldHxlbnwxfHx8fDE3NjE0OTQxNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '10-15 years',
      duration: '8 weeks',
      spots: '12',
      badge: 'Tech Savvy',
      price: '$380',
      schedule: 'Sundays, 10:00 AM - 12:00 PM',
      rating: 4.7,
      reviews: 156,
      detailedDescription: 'Step into the future of art creation with digital tools and software! Students learn professional digital art techniques using industry-standard software and drawing tablets.',
      highlights: [
        'Professional drawing tablets provided',
        'Learn industry-standard software',
        'Create digital portfolios',
        'Character design and illustration',
        'Photo editing basics',
        'Export artwork for printing',
      ],
      curriculum: [
        {
          week: 'Weeks 1-2',
          title: 'Digital Tools Introduction',
          topics: ['Tablet basics', 'Software navigation', 'Layers and brushes', 'Digital workspace'],
        },
        {
          week: 'Weeks 3-4',
          title: 'Digital Drawing',
          topics: ['Line art techniques', 'Digital coloring', 'Brush customization', 'Color palettes'],
        },
        {
          week: 'Weeks 5-6',
          title: 'Character & Illustration',
          topics: ['Character design', 'Illustration techniques', 'Composition', 'Storytelling'],
        },
        {
          week: 'Weeks 7-8',
          title: 'Advanced Techniques',
          topics: ['Photo manipulation', 'Special effects', 'Final project', 'Portfolio creation'],
        },
      ],
      whatToBring: [
        'USB drive for saving work',
        'Snack and water',
        'Ideas and imagination!',
      ],
      materialsProvided: [
        'Drawing tablets',
        'Computers with software',
        'Digital brushes and assets',
        'Tutorial materials',
        'Project files',
      ],
    },
    'watercolor-techniques': {
      title: 'Watercolor Techniques',
      description: 'Learn the delicate art of watercolor painting with expert guidance and creative freedom.',
      image: 'https://images.unsplash.com/photo-1713815539197-78db123d8f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzYxNDgwNjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '7-11 years',
      duration: '8 weeks',
      spots: '15',
      badge: 'New',
      price: '$300',
      schedule: 'Saturdays, 3:00 PM - 4:30 PM',
      rating: 5.0,
      reviews: 48,
      detailedDescription: 'Discover the beautiful and flowing medium of watercolor! Students learn essential watercolor techniques while creating stunning paintings of nature, animals, and imaginative scenes.',
      highlights: [
        'Master wet-on-wet techniques',
        'Learn color blending',
        'Create beautiful paintings',
        'Professional watercolor supplies',
        'Nature-inspired projects',
        'Gentle, encouraging instruction',
      ],
      curriculum: [
        {
          week: 'Weeks 1-2',
          title: 'Watercolor Basics',
          topics: ['Brush control', 'Water-to-paint ratios', 'Basic washes', 'Color mixing'],
        },
        {
          week: 'Weeks 3-4',
          title: 'Techniques & Effects',
          topics: ['Wet-on-wet', 'Wet-on-dry', 'Salt and splatter', 'Gradients and blending'],
        },
        {
          week: 'Weeks 5-6',
          title: 'Nature Painting',
          topics: ['Flowers and plants', 'Sky and water', 'Landscapes', 'Animals'],
        },
        {
          week: 'Weeks 7-8',
          title: 'Creative Expression',
          topics: ['Imaginative scenes', 'Abstract watercolor', 'Final masterpiece', 'Art sharing'],
        },
      ],
      whatToBring: [
        'Water bottle',
        'Paper towels or cloth',
        'Excitement to paint!',
      ],
      materialsProvided: [
        'Professional watercolor paints',
        'Watercolor paper',
        'Quality brushes',
        'Palettes',
        'Reference images',
      ],
    },
    'mixed-media': {
      title: 'Mixed Media Art',
      description: 'Combine different materials and techniques to create unique, multi-dimensional artworks.',
      image: 'https://images.unsplash.com/photo-1542978415-64bbba6025c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdXBwbGllcyUyMGNvbG9yZnVsfGVufDF8fHx8MTc2MTU1MjM1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      age: '8-12 years',
      duration: '12 weeks',
      spots: '10',
      badge: 'Creative',
      price: '$400',
      schedule: 'Sundays, 1:00 PM - 3:00 PM',
      rating: 5.0,
      reviews: 82,
      detailedDescription: 'Push the boundaries of creativity by combining various art materials and techniques! This exciting program encourages experimentation and personal expression through mixed media projects.',
      highlights: [
        'Explore multiple art forms',
        'Experiment with materials',
        'Develop unique style',
        'Create portfolio pieces',
        'Learn professional techniques',
        'Freedom to create',
      ],
      curriculum: [
        {
          week: 'Weeks 1-3',
          title: 'Collage & Assemblage',
          topics: ['Paper collage', 'Found objects', 'Layering techniques', 'Composition'],
        },
        {
          week: 'Weeks 4-6',
          title: 'Paint & Mixed Media',
          topics: ['Acrylic with collage', 'Texture building', 'Resist techniques', 'Color integration'],
        },
        {
          week: 'Weeks 7-9',
          title: '3D Mixed Media',
          topics: ['Relief art', 'Shadow boxes', 'Dimensional pieces', 'Material exploration'],
        },
        {
          week: 'Weeks 10-12',
          title: 'Personal Projects',
          topics: ['Self-directed work', 'Series creation', 'Advanced techniques', 'Final exhibition'],
        },
      ],
      whatToBring: [
        'Magazines or images for collage',
        'Small found objects (optional)',
        'Open mind and creativity!',
      ],
      materialsProvided: [
        'Paints and inks',
        'Papers and canvases',
        'Adhesives and mediums',
        'Decorative materials',
        'Tools and accessories',
      ],
    },
  };

  const program = programsData[programId];

  if (!program) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl mb-4">Program Not Found</h2>
          <Button onClick={onBack} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Button
              onClick={onBack}
              variant="outline"
              className="mb-6 border-white text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Button>
            <Badge className="bg-purple-600 hover:bg-purple-600 mb-4">
              {program.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl text-white mb-4">{program.title}</h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>{program.rating}</span>
                <span className="text-white/80">({program.reviews} reviews)</span>
              </div>
              <span className="text-white/80">•</span>
              <span>Ages {program.age}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div>
              <h2 className="text-3xl mb-4">Program Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {program.detailedDescription}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-3xl mb-4">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-3xl mb-4">Curriculum</h2>
              <Accordion type="single" collapsible className="w-full">
                {program.curriculum.map((section: any, index: number) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div>
                        <div className="text-sm text-purple-600 mb-1">{section.week}</div>
                        <div className="text-lg">{section.title}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pl-4">
                        {section.topics.map((topic: string, topicIndex: number) => (
                          <li key={topicIndex} className="flex items-start gap-2 text-gray-600">
                            <BookOpen className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Gallery Images */}
            <div>
              <h2 className="text-3xl mb-4">In the Studio</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630077852169-3900cc6f4f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBjbGFzcyUyMGNoaWxkcmVuJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzYxNjU3NTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Art class in action"
                  className="rounded-lg w-full h-64 object-cover"
                />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1752649936371-72629121227d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjB0ZWFjaGVyJTIwc3R1ZGVudHMlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzYxNjU3NTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Students creating art"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Materials */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Palette className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl">Materials Provided</h3>
                  </div>
                  <ul className="space-y-2">
                    {program.materialsProvided.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-pink-600" />
                    </div>
                    <h3 className="text-xl">What to Bring</h3>
                  </div>
                  <ul className="space-y-2">
                    {program.whatToBring.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <Check className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20 border-2 border-purple-200">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="text-4xl text-purple-600 mb-2">{program.price}</div>
                  <div className="text-gray-600">{program.duration} program</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div>{program.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-500">Schedule</div>
                      <div>{program.schedule}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-500">Class Size</div>
                      <div>Max {program.spots} students</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Award className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-500">Age Group</div>
                      <div>{program.age}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="text-sm text-gray-500">Available At</div>
                      <div>All locations</div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => onEnroll(programId)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6 mb-3"
                >
                  Enroll Now
                </Button>
                <Button 
                  onClick={() => {
                    addToCart({
                      id: programId,
                      name: program.title,
                      price: program.price,
                      type: 'program',
                      duration: program.duration,
                      age: program.age,
                    });
                    toast.success(`${program.title} added to cart!`);
                  }}
                  variant="outline" 
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 mb-3"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  onClick={() => onNavigate?.('contact')}
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Contact Us
                </Button>

                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>All materials included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Expert instruction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Small class sizes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Flexible payment plans</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

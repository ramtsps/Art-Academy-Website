import { useState } from 'react';
import { useForm } from 'react-hook-form@7.55.0';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  CreditCard,
  Lock,
  Check,
  AlertCircle
} from 'lucide-react';

interface EnrollmentFormProps {
  preSelectedProgramId?: string;
  onBack: () => void;
}

export function EnrollmentForm({ preSelectedProgramId, onBack }: EnrollmentFormProps) {
  const [step, setStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState(preSelectedProgramId || '');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const programs = [
    { id: 'acrylic-painting', name: 'Acrylic Painting', price: 320, duration: '8 weeks', age: '7-12 years' },
    { id: 'drawing-sketching', name: 'Drawing & Sketching', price: 280, duration: '10 weeks', age: '6-10 years' },
    { id: 'sculpture-3d', name: 'Sculpture & 3D Art', price: 360, duration: '10 weeks', age: '8-13 years' },
    { id: 'digital-art', name: 'Digital Art', price: 380, duration: '8 weeks', age: '10-15 years' },
    { id: 'watercolor-techniques', name: 'Watercolor Techniques', price: 300, duration: '8 weeks', age: '7-11 years' },
    { id: 'mixed-media', name: 'Mixed Media Art', price: 400, duration: '12 weeks', age: '8-12 years' },
  ];

  const locations = [
    'Downtown Seattle',
    'Bellevue Square',
    'Capitol Hill',
    'Fremont District',
    'Ballard Avenue',
    'West Seattle',
    'University District',
    'Green Lake',
    'Queen Anne',
    'Wallingford',
  ];

  const selectedProgramData = programs.find(p => p.id === selectedProgram);

  const onSubmit = (data: any) => {
    console.log('Enrollment data:', data);
    toast.success('Enrollment successful! 🎨', {
      description: 'You will receive a confirmation email shortly.',
    });
    // In a real app, this would process the payment and enrollment
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const handleNext = () => {
    if (step === 1 && !selectedProgram) {
      toast.error('Please select a program');
      return;
    }
    if (step === 1 && !selectedLocation) {
      toast.error('Please select a location');
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="pt-16 min-h-screen bg-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className={step >= 1 ? 'text-purple-600' : 'text-gray-600'}>Program</span>
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`} />
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > 2 ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className={step >= 2 ? 'text-purple-600' : 'text-gray-600'}>Student Info</span>
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`} />
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span className={step >= 3 ? 'text-purple-600' : 'text-gray-600'}>Payment</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Program Selection */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Program & Location</CardTitle>
                <CardDescription>Choose the program you'd like to enroll in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="program">Program *</Label>
                  <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                    <SelectTrigger id="program" className="mt-2">
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name} - ${program.price} ({program.duration})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProgramData && (
                  <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Program:</span>
                          <span>{selectedProgramData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span>{selectedProgramData.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Age Group:</span>
                          <span>{selectedProgramData.age}</span>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="text-2xl text-purple-600">${selectedProgramData.price}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div>
                  <Label htmlFor="location">Preferred Location *</Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger id="location" className="mt-2">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="startDate">Preferred Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    className="mt-2"
                    {...register('startDate', { required: true })}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-600 mt-1">Start date is required</p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Continue to Student Information
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Student Information */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
                <CardDescription>Tell us about the student</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentFirstName">Student First Name *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="studentFirstName"
                        className="pl-10"
                        placeholder="John"
                        {...register('studentFirstName', { required: true })}
                      />
                    </div>
                    {errors.studentFirstName && (
                      <p className="text-sm text-red-600 mt-1">First name is required</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="studentLastName">Student Last Name *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="studentLastName"
                        className="pl-10"
                        placeholder="Doe"
                        {...register('studentLastName', { required: true })}
                      />
                    </div>
                    {errors.studentLastName && (
                      <p className="text-sm text-red-600 mt-1">Last name is required</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentAge">Student Age *</Label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="studentAge"
                        type="number"
                        className="pl-10"
                        placeholder="8"
                        min="4"
                        max="18"
                        {...register('studentAge', { required: true, min: 4, max: 18 })}
                      />
                    </div>
                    {errors.studentAge && (
                      <p className="text-sm text-red-600 mt-1">Valid age is required (4-18)</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="studentGrade">Grade Level</Label>
                    <Input
                      id="studentGrade"
                      className="mt-2"
                      placeholder="3rd Grade"
                      {...register('studentGrade')}
                    />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg">Parent/Guardian Information</h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parentFirstName">First Name *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="parentFirstName"
                        className="pl-10"
                        placeholder="Jane"
                        {...register('parentFirstName', { required: true })}
                      />
                    </div>
                    {errors.parentFirstName && (
                      <p className="text-sm text-red-600 mt-1">First name is required</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="parentLastName">Last Name *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="parentLastName"
                        className="pl-10"
                        placeholder="Doe"
                        {...register('parentLastName', { required: true })}
                      />
                    </div>
                    {errors.parentLastName && (
                      <p className="text-sm text-red-600 mt-1">Last name is required</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      placeholder="jane.doe@example.com"
                      {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">Valid email is required</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-10"
                      placeholder="(555) 123-4567"
                      {...register('phone', { required: true })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">Phone number is required</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    className="mt-2"
                    placeholder="Emergency contact"
                    {...register('emergencyContact')}
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      className="pl-10"
                      placeholder="(555) 987-6543"
                      {...register('emergencyPhone')}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Secure payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Program:</span>
                        <span>{selectedProgramData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span>{selectedProgramData?.duration}</span>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${selectedProgramData?.price}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Registration Fee:</span>
                        <span>$25</span>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between text-xl">
                        <span>Total:</span>
                        <span className="text-purple-600">${(selectedProgramData?.price || 0) + 25}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <Label>Payment Method *</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2 space-y-3">
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Credit or Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        PayPal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                      <RadioGroupItem value="payment-plan" id="payment-plan" />
                      <Label htmlFor="payment-plan" className="flex-1 cursor-pointer">
                        Payment Plan (3 monthly installments)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Cardholder Name *</Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="cardName"
                          className="pl-10"
                          placeholder="Jane Doe"
                          {...register('cardName', { required: paymentMethod === 'card' })}
                        />
                      </div>
                      {errors.cardName && (
                        <p className="text-sm text-red-600 mt-1">Cardholder name is required</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <div className="relative mt-2">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="cardNumber"
                          className="pl-10"
                          placeholder="4242 4242 4242 4242"
                          {...register('cardNumber', { required: paymentMethod === 'card' })}
                        />
                      </div>
                      {errors.cardNumber && (
                        <p className="text-sm text-red-600 mt-1">Card number is required</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date *</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="mt-2"
                          {...register('expiry', { required: paymentMethod === 'card' })}
                        />
                        {errors.expiry && (
                          <p className="text-sm text-red-600 mt-1">Required</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV *</Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            id="cvv"
                            className="pl-10"
                            placeholder="123"
                            maxLength={4}
                            {...register('cvv', { required: paymentMethod === 'card' })}
                          />
                        </div>
                        {errors.cvv && (
                          <p className="text-sm text-red-600 mt-1">Required</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm">You will be redirected to PayPal to complete your payment securely.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === 'payment-plan' && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="space-y-2 text-sm">
                        <p>Your payment will be split into 3 monthly installments:</p>
                        <ul className="space-y-1 pl-4">
                          <li>• Today: ${Math.ceil(((selectedProgramData?.price || 0) + 25) / 3)}</li>
                          <li>• Month 2: ${Math.ceil(((selectedProgramData?.price || 0) + 25) / 3)}</li>
                          <li>• Month 3: ${Math.floor(((selectedProgramData?.price || 0) + 25) / 3)}</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the terms and conditions, cancellation policy, and understand that a $25 non-refundable registration fee applies
                  </Label>
                </div>

                <div className="bg-gray-50 border rounded-lg p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="mb-1">Your payment information is secure and encrypted.</p>
                    <p className="text-xs">This is a demo form. No actual payment will be processed.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!agreeToTerms}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Complete Enrollment
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
}

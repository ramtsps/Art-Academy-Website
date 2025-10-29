import { useState } from 'react';
import { useForm } from 'react-hook-form@7.55.0';
import { useCart } from './CartContext';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  CreditCard,
  Lock,
  Check,
  AlertCircle,
  ShoppingCart
} from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
}

export function CheckoutPage({ onBack }: CheckoutPageProps) {
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Checkout data:', data);
    toast.success('Order placed successfully! 🎨', {
      description: 'You will receive a confirmation email shortly.',
    });
    clearCart();
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started!</p>
            <Button onClick={onBack} className="bg-purple-600 hover:bg-purple-700">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const hasPrograms = items.some(item => item.type === 'program');

  return (
    <div className="pt-16 min-h-screen bg-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button onClick={onBack} variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="text-4xl mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>We'll use this to send your confirmation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="firstName"
                          className="pl-10"
                          placeholder="Jane"
                          {...register('firstName', { required: true })}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-sm text-red-600 mt-1">First name is required</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="lastName"
                          className="pl-10"
                          placeholder="Doe"
                          {...register('lastName', { required: true })}
                        />
                      </div>
                      {errors.lastName && (
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
                </CardContent>
              </Card>

              {/* Student Information - Only show if cart has programs */}
              {hasPrograms && (
                <Card>
                  <CardHeader>
                    <CardTitle>Student Information</CardTitle>
                    <CardDescription>Required for program enrollment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="studentFirstName">Student First Name *</Label>
                        <Input
                          id="studentFirstName"
                          className="mt-2"
                          placeholder="John"
                          {...register('studentFirstName', { required: hasPrograms })}
                        />
                        {errors.studentFirstName && (
                          <p className="text-sm text-red-600 mt-1">Required</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="studentLastName">Student Last Name *</Label>
                        <Input
                          id="studentLastName"
                          className="mt-2"
                          placeholder="Doe"
                          {...register('studentLastName', { required: hasPrograms })}
                        />
                        {errors.studentLastName && (
                          <p className="text-sm text-red-600 mt-1">Required</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="studentAge">Student Age *</Label>
                        <Input
                          id="studentAge"
                          type="number"
                          className="mt-2"
                          placeholder="8"
                          min="4"
                          max="18"
                          {...register('studentAge', { required: hasPrograms, min: 4, max: 18 })}
                        />
                        {errors.studentAge && (
                          <p className="text-sm text-red-600 mt-1">Valid age required (4-18)</p>
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
                  </CardContent>
                </Card>
              )}

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                  <CardDescription>Secure payment processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                            <li>• Today: ${Math.ceil((getTotalPrice() + 25) / 3).toFixed(2)}</li>
                            <li>• Month 2: ${Math.ceil((getTotalPrice() + 25) / 3).toFixed(2)}</li>
                            <li>• Month 3: ${Math.floor((getTotalPrice() + 25) / 3).toFixed(2)}</li>
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
                </CardContent>
              </Card>

              <Button
                type="submit"
                disabled={!agreeToTerms}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed py-6 text-lg"
              >
                Complete Purchase
              </Button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b last:border-b-0">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <span className="text-xs text-gray-600">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Registration Fee</span>
                    <span>$25.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span className="text-purple-600">
                      ${(getTotalPrice() + 25).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-4">
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

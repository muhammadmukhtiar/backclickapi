import { Controller, Post, Body, Res } from '@nestjs/common';
import axios from 'axios';

@Controller('payment')
export class PaymentController {
  private readonly jazzCashPaymentUrl = 'https://api.jazzcash.com.pk/payment/pay';
  private readonly jazzCashVerifyUrl = 'https://api.jazzcash.com.pk/payment/verify';
  private readonly apiKey = 'YOUR_API_KEY';
  private readonly accessToken = 'YOUR_ACCESS_TOKEN';

  @Post()
  async initiatePayment(@Body() paymentData: PaymentData, @Res() res: any): Promise<any> {
    const { amount, phoneNumber, description } = paymentData;

    const payload = {
      amount,
      phoneNumber,
      description,
      apiKey: this.apiKey,
      accessToken: this.accessToken,
    };

    const paymentResponse = await axios.post(this.jazzCashPaymentUrl, payload);

    // Prompt the user to provide the payment code
    const paymentCode = '123456'; // Replace with user input or other logic to obtain the payment code

    // Pass the payment code to the response
    res.send({ ...paymentResponse.data, paymentCode });
  }

  @Post('/verify')
  async verifyPayment(@Body() verificationData: VerificationData): Promise<any> {
    const { orderId, transactionId } = verificationData;

    const payload = {
      orderId,
      transactionId,
      apiKey: this.apiKey,
      accessToken: this.accessToken,
    };

    const verificationResponse = await axios.post(this.jazzCashVerifyUrl, payload);

    return verificationResponse.data;
  }
}

interface PaymentData {
  amount: number;
  phoneNumber: string;
  description: string;
}

interface VerificationData {
  orderId: string;
  transactionId: string;
}

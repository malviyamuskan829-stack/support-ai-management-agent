import { Order, PaymentInfo } from '../models/types';

const mockOrders: { [key: string]: Order } = {
  '12345': {
    orderId: '12345',
    status: 'processing',
    expectedShipDate: '2026-10-05T00:00:00Z',
    trackingUrl: 'https://track.example.com/12345',
    carrier: 'BlueDart',
  },
  '88214': {
    orderId: '88214',
    status: 'processing',
    expectedShipDate: '2026-10-06T00:00:00Z',
    trackingUrl: 'https://track.example.com/88214',
    carrier: 'Delhivery',
  },
  '88290': {
    orderId: '88290',
    status: 'confirmed',
    expectedShipDate: '2026-10-07T00:00:00Z',
    trackingUrl: 'https://track.example.com/88290',
    carrier: 'BlueDart',
  },
};

const mockPayments: { [key: string]: PaymentInfo } = {
  '12345': { paid: true, refundEligible: true },
  '88214': { paid: true, refundEligible: true },
  '88290': { paid: true, refundEligible: false },
};

export class OrderService {
  static getOrderById(id: string): Order | null {
    return mockOrders[id] || null;
  }

  static getPaymentInfo(id: string): PaymentInfo | null {
    return mockPayments[id] || null;
  }
}

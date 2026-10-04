import http from 'http';
import { OrderService } from '../services/orderService';

export class OrderController {
  static getOrder(orderId: string, res: http.ServerResponse): void {
    const order = OrderService.getOrderById(orderId);
    if (!order) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `Order #${orderId} not found` }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(order));
    }
  }

  static getPayment(orderId: string, res: http.ServerResponse): void {
    const payment = OrderService.getPaymentInfo(orderId);
    if (!payment) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `Payment records for #${orderId} not found` }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(payment));
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
}

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  @Input() username?: string;
  orders: Order[] = [];

  constructor() {}

  ngOnInit(): void {
    // Initialize order history for the given username
    if (this.username) {
      this.loadOrderHistory();
    }
  }

  private loadOrderHistory(): void {
    // TODO: Implement order history loading logic
    // You'll need to create an order service and call it here
    console.log(`Loading order history for ${this.username}`);
    
    // Temporary mock data - replace with actual service call
    this.orders = [
      { id: '12345', date: '2025-10-25', status: 'Delivered', total: 25.99 },
      { id: '12344', date: '2025-10-20', status: 'Shipped', total: 15.50 }
    ];
  }

  hasOrders(): boolean {
    return this.orders && this.orders.length > 0;
  }

}

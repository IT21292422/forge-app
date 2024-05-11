/// <reference path="./payhere.d.ts" />
interface Payhere {
  onCompleted: (orderId: string) => void;
  onDismissed: () => void;
  onError: (error: string) => void;
  startPayment: (payment: any) => void;
}

interface Window {
  payhere: Payhere;
}

interface PaymentObject {
  sandbox: boolean;
  merchant_id: string | undefined;
  return_url?: string | undefined;
  cancel_url?: string | undefined;
  notify_url: string;
  order_id: string;
  items: string;
  amount: string;
  currency: string;
  hash: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  delivery_address: string;
  delivery_city: string;
  delivery_country: string;
  custom_1?: string;
  custom_2?: string;
}

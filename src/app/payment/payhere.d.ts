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

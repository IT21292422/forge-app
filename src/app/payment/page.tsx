'use client';
import Script from 'next/script';

export default function Payment() {
    const [order_id, itemName, amount] = ["12334", "python", "1000.00"]
    return (
        <>
            <Script src="https://www.payhere.lk/lib/payhere.js" strategy="beforeInteractive" />
            <button type="submit" id="payhere-payment">PayHere Pay</button>
            <Script id="payhere-payment-script" strategy="afterInteractive">{`
                payhere.onCompleted = function onCompleted(orderId) {
                console.log("Payment completed. OrderID:" + orderId);
                };

                payhere.onDismissed = function onDismissed() {
                console.log("Payment dismissed");
                };

                payhere.onError = function onError(error) {
                console.log("Error:" + error);
                };

                const payment = {
                "sandbox": true,
                "merchant_id": ${process.env.NEXT_PUBLIC_MERCHANT_ID},
                "return_url": undefined,
                "cancel_url": undefined,
                "notify_url": "http://sample.com/notify",
                "order_id": ${order_id},
                "items": ${itemName},
                "amount": ${amount},
                "currency": "LKR",
                "hash": "45D3CBA93E9F2189BD630ADFE19AA6DC",
                "first_name": "Saman",
                "last_name": "Perera",
                "email": "samanp@gmail.com",
                "phone": "0771234567",
                "address": "No.1, Galle Road",
                "city": "Colombo",
                "country": "Sri Lanka",
                "delivery_address": "No. 46, Galle road, Kalutara South",
                "delivery_city": "Kalutara",
                "delivery_country": "Sri Lanka",
                "custom_1": "",
                "custom_2": ""
                };

                document.getElementById('payhere-payment').onclick = function (e) {
                payhere.startPayment(payment);
                };
      `}</Script>
        </>
    );
}
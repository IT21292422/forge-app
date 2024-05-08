'use client';
import Script from 'next/script';
import { useEffect } from 'react';

interface PaymentObject {
    sandbox: boolean;
    merchant_id: string;
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

export default function Payment() {
    useEffect(() => {
        const paymentScript = document.createElement('script');

        function initPaymentScript() {
            window.payhere.onCompleted = function onCompleted(orderId: string) {
                console.log("Payment completed. OrderID:" + orderId);
            };

            window.payhere.onDismissed = function onDismissed() {
                console.log("Payment dismissed");
            };

            window.payhere.onError = function onError(error: string) {
                console.log("Error:" + error);
            };

            const payment: PaymentObject = {
                "sandbox": true,
                "merchant_id": "121XXXX",
                "return_url": undefined,
                "cancel_url": undefined,
                "notify_url": "http://sample.com/notify",
                "order_id": "ItemNo12345",
                "items": "Door bell wireles",
                "amount": "1000.00",
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

            const paymentButton = document.getElementById('payhere-payment');
            paymentButton!.onclick = function (e) {
                window.payhere.startPayment(payment);
            };

            const scriptCode = `
                payhere.onCompleted = ${window.payhere.onCompleted.toString()};
                payhere.onDismissed = ${window.payhere.onDismissed.toString()};
                payhere.onError = ${window.payhere.onError.toString()};
                const payment = ${JSON.stringify(payment)};
                const paymentButton = document.getElementById('payhere-payment');
                paymentButton.onclick = function (e) {
                payhere.startPayment(payment);
                };`;

            paymentScript.innerHTML = scriptCode;
        }

        initPaymentScript();
        document.body.appendChild(paymentScript);

        return () => {
            document.body.removeChild(paymentScript);
        };
    }, []);

    return (
        <>
            <Script src="https://www.payhere.lk/lib/payhere.js" strategy="beforeInteractive" />
            <button type="submit" id="payhere-payment">PayHere Pay</button>
        </>
    );
}
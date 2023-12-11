import React, { useEffect } from 'react';
import { Wrapper } from '../components/wrapper';
import PaymentTable from '../components/paymentTable';
import { PAYMENT_PAGE } from '../config';

const PaymentPage: React.FC = () => {
  useEffect(() => {
    localStorage.setItem('page', PAYMENT_PAGE);
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col h-[99%] gap-10 w-full">
        <h1 className="text-d-two text-4xl">Envelope de pagamento</h1>
        <div className="flex h-5/6">
          <PaymentTable />
        </div>
      </div>
    </Wrapper>
  );
};

export default PaymentPage;

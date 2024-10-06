import React, { useEffect, useState } from 'react';
import { fetchAllPaymentHistory } from 'apis/api';

export const HistoryPage = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await fetchAllPaymentHistory();

        if (Array.isArray(history)) {
          setPaymentHistory(history);
        } else {
          setPaymentHistory([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching payment history:', error);
        setPaymentHistory([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>결제 내역</h1>
      {paymentHistory.length === 0 ? (
        <p>결제 내역이 없습니다.</p>
      ) : (
        paymentHistory.map((payment, index) => (
          <div key={index}>
            <p>상품 이름: {payment.item_name}</p>
            <p>결제 금액: {payment.amount}원</p>
            <p>결제 수단: {payment.payment_method_type}</p>
            <p>
              결제 승인 시간: {new Date(payment.approved_at).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
export default HistoryPage;

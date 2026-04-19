import { createContext, useState, useEffect, useContext } from 'react';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  // Store seat number in local storage to simulate "embedded screen"
  const [seatNumber, setSeatNumber] = useState(localStorage.getItem('seatNumber') || '');
  
  // Mock Firebase data: Array of orders
  const [orders, setOrders] = useState([]);
  
  // Update local storage when seat number changes
  useEffect(() => {
    if (seatNumber) {
      localStorage.setItem('seatNumber', seatNumber);
    }
  }, [seatNumber]);

  // Load mock orders on start (so staff panel has something if they refresh)
  useEffect(() => {
    const savedOrders = localStorage.getItem('mockOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Seed with some old orders
      const seedOrders = [
        { id: '1001', seatNumber: '4', item: 'Coffee', sugar: 'Medium', status: 'Delivered', timestamp: Date.now() - 3600000 },
        { id: '1002', seatNumber: '12', item: 'Tea', sugar: 'High', status: 'Pending', timestamp: Date.now() - 60000 }
      ];
      setOrders(seedOrders);
      localStorage.setItem('mockOrders', JSON.stringify(seedOrders));
    }
  }, []);

  // Save to local storage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('mockOrders', JSON.stringify(orders));
    }
  }, [orders]);

  const placeOrder = (item, sugar) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          id: Math.floor(1000 + Math.random() * 9000).toString(),
          seatNumber,
          item,
          sugar,
          status: 'Pending',
          timestamp: Date.now()
        };
        setOrders((prev) => [...prev, newOrder]);
        resolve(newOrder);
      }, 600); // Simulate network latency
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{
      seatNumber,
      setSeatNumber,
      orders,
      placeOrder,
      updateOrderStatus,
      pendingOrdersCount: orders.filter(o => o.status !== 'Delivered').length
    }}>
      {children}
    </OrderContext.Provider>
  );
};

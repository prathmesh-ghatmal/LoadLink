"use client";

import api from "../lib/api";

// ------------------
// Types
// ------------------

export type PaymentStatus = "pending" | "completed" | "failed";

export interface PaymentCreate {
  booking_id: string; // we won't need this if we pass as path param
}

export interface PaymentOut {
  id: string;
  booking_id: string;
  from_user_id: string;
  to_user_id: string;
  amount: number;
  status: PaymentStatus;
  created_date: string;
  completed_date?: string;
}

// ------------------
// API calls
// ------------------

// Create a payment and mark booking as paid
export const createPaymentApi = async (
  bookingId: string
): Promise<PaymentOut> => {
  const res = await api.post(`/payments/${bookingId}`);
  return res.data;
};

// Get payment by ID
export const getPaymentByIdApi = async (
  paymentId: string
): Promise<PaymentOut> => {
  const res = await api.get(`/payments/id/${paymentId}`);
  return res.data;
};

// Optionally, get all payments (admin)
export const getAllPaymentsApi = async (): Promise<PaymentOut[]> => {
  const res = await api.get("/payments/");
  return res.data;
};

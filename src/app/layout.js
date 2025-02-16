"use client";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from 'react-redux';
import store from "../store/Store"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}

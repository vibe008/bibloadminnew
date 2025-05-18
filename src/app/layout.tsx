"use client"
import { Outfit } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import {fetchLoggedInUser} from "../Services/authService"
const outfit = Outfit({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] =useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem('superadmin');
    console.log("userRole",userRole)
  }, [loading]);
  // console.log("rolelayout",role)
  useEffect(() => {
    const checkUser = async () => {
      const user = await fetchLoggedInUser(); 
      if (user) {
        // console.log("user",user)
        setUser(user); 
        setLoading(!loading)
      }
      else{
       setLoading(!loading)
        // router.push('/signin');
        redirect('/signin');
      }
    };
    checkUser();
  }, [user]);
  // console.log("loading",loading)
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

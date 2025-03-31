"use client";
import Login from "@/app/login/page";
// import LoginBasico from "@/app/login-basico/page";

export default function Home() {
  return (
    <div className="min-h-screen p-0 transition-colors duration-100 flex items-center">
      <Login />
      {/* <LoginBasico /> */}
    </div>
  );
}
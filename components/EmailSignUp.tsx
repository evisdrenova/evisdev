"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const emailVerification = (value: string) => {
    // simple email regex pattern
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(emailVerification(value));
  };

  const handleSubmit = () => {
    try {
      console.log("submit");
    } catch (e) {
      console.log("error:", e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>Email Sign Up</div>
      <div className="flex flex-row items-center gap-2 relative">
        <Input
          type="email"
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={handleChange}
          className="border border-gray-800"
        />
        <Button
          onClick={handleSubmit}
          className="right-2 absolute h-7 rounded-md group"
        >
          Subscribe
          <ChevronRight className="mx-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
      {isValid === false && (
        <p className="text-red-500 text-sm">Please enter a valid email.</p>
      )}
      {isValid === true && (
        <p className="text-green-600 text-sm">Email looks good!</p>
      )}
    </div>
  );
}

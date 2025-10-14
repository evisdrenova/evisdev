"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");

  const emailVerification = (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const valid = emailVerification(email);
    setIsValid(valid);

    if (!valid) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      console.log("submit", email);
      setMessage("Thanks for subscribing!");
      await fetch("/api/signup", {
        method: "POST",
      });
    } catch (e) {
      console.log("error:", e);
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <div className="font-semibold">
        Subscribe to get future posts before anyone else.
      </div>
      <div className="flex flex-row items-center gap-2 relative">
        <Input
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-800"
        />
        <Button type="submit" className="right-2 absolute h-7 rounded-md group">
          Subscribe
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>

      {isValid === false && <p className="text-red-500 text-sm">{message}</p>}
      {isValid === true && <p className="text-green-700 text-sm">{message}</p>}
    </form>
  );
}

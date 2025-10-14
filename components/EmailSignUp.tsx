"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ChevronRight, Check } from "lucide-react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const emailVerification = (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setOk(false);

    const valid = emailVerification(email);
    setIsValid(valid);
    if (!valid) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName: "Evis" }), // pass whatever you need
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const serverMsg =
          data?.error?.message ||
          data?.error ||
          "Subscription failed. Please try again.";
        setIsValid(false);
        setMessage(serverMsg);
        return;
      }

      // success
      setOk(true);
      setIsValid(true);
      setMessage("Thanks for subscribing!");
      setEmail("");

      // optional: auto-clear success after a moment
      setTimeout(() => {
        setOk(false);
        setMessage("");
        setIsValid(null);
      }, 3000);
    } catch (err) {
      setIsValid(false);
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full border-gray-300 border-y py-10 my-10"
    >
      <div className="font-semibold">
        Subscribe to get future posts before anyone else.
      </div>

      <div className="flex flex-row items-center gap-2 relative">
        <Input
          placeholder="johndoe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-800 pr-28"
          disabled={loading || ok}
        />
        <Button
          type="submit"
          className="right-2 absolute h-7 rounded-md group px-3"
          disabled={loading || ok}
        >
          {ok ? (
            <Check className="h-4 w-4" />
          ) : (
            <>
              {loading ? "Submitting…" : "Subscribe"}
              {!loading && (
                <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </>
          )}
        </Button>
      </div>

      {isValid === false && <p className="text-red-500 text-sm">{message}</p>}
      {isValid === true && message && (
        <p className="text-green-700 text-sm">{message}</p>
      )}
    </form>
  );
}

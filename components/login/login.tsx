import { TwitterIcon } from "@/icons/twitter-icon";
import { FC, FormEvent, useState } from "react";

export const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-4"
      >
        <TwitterIcon />
        <h1 className="text-3xl">Sign in to Bitter</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-400"
        />
        <button
          type="submit"
          className="bg-white text-black py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
      <p>Don't have an account? <a className="text-teal-500">Sign Up</a></p>
    </div>
  );
};

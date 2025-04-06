import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import ConfigForm from "@/components/ConfigForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function IndexPage() {
  return (
    <div>
      <h1>Mock Test Configuration</h1>
      <ConfigForm />
    </div>
  );
}

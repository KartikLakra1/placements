"use client"

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
        <p className="text-lg text-center md:text-left">
          © {new Date().getFullYear()} Made by <span className="font-bold">Kartik Lakra and Hemonesh.</span> All Rights Reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white text-sm">Privacy</Link>
          <Link href="/terms" className="hover:text-white text-sm">Terms</Link>
          <Link href="/contact" className="hover:text-white text-sm">Contact</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

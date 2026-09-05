'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, Instagram, Linkedin, MessageCircle, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-20">
              <h1 className="mb-6 text-6xl font-extrabold tracking-tight leading-tight text-gray-600 sm:text-7xl">
              Contact Us
              </h1>
              <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gray-300"></div>
            </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Contact Form */}
            <div className="relative">
              <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-md">
                <div>
                  <h2 className="mb-8 text-3xl font-bold text-gray-600">Are you interested in joining NSS?</h2>
                  
                  <form className="space-y-6">
                    <Link
                      href="/#join-nss"
                      className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-gray-700 px-8 py-4 text-lg font-semibold text-white shadow-sm transition-all duration-300 hover:bg-gray-600 hover:shadow-lg"
                    >
                      <Rocket className="w-5 h-5" />
                      <span>Join Us</span>
                    </Link>
                  </form>
                </div>
              </div>
              {/* Large centered logo below the Join button */}
              <div className="mt-6">
                <div className="w-full flex justify-center">
                  <Link href="/" aria-label="NSS IIIT Hyderabad" className="flex flex-col items-center gap-4">
                    <div className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-lg border-4 border-white/80">
                      <Image
                        src="/favicon.ico"
                        alt="NSS IIIT Hyderabad Logo"
                        width={384}
                        height={384}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-gray-600 md:text-3xl">NSS IIIT Hyderabad</h4>
                      <p className="max-w-xl text-sm text-gray-600 md:text-base">National Service Scheme - community service &amp; student outreach</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-md transition-all duration-300 hover:border-gray-400 hover:shadow-lg">
                <div className="relative flex items-start gap-4 p-8">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gray-900 shadow-md">
                    <Mail className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-600">Email Us</h3>
                    <a href="mailto:nss@iiit.ac.in" className="text-lg font-medium text-gray-500 hover:text-gray-700">
                      nss@iiit.ac.in
                    </a>
                    <p className="text-gray-600 text-sm mt-1">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-400 hover:shadow-md">
                <div className="flex items-start gap-4 p-8">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gray-700 shadow-sm">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">Visit Us</h3>
                    <p className="text-gray-700 font-medium text-lg">
                      IIIT Hyderabad
                    </p>
                    <p className="text-gray-600 mt-1">
                      Professor CR Rao Road, Gachibowli,<br />
                      Hyderabad, Telangana 500032, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
                <div className="absolute inset-0 bg-gray-50/40"></div>
                <div className="relative">
                  <h3 className="mb-6 text-2xl font-bold text-gray-600">Follow Us On Social Media</h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/nss_iiith/", color: "from-blue-600 to-blue-800" },
                      { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/nssiiith/", color: "from-blue-700 to-blue-900" },
                      { icon: MessageCircle, label: "WhatsApp", href: "https://chat.whatsapp.com/DmDwI59gXglHHZ9CuYPKkM", color: "from-green-600 to-green-800" },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-6 py-3 transition-all duration-300 hover:bg-gray-100 hover:scale-110"
                      >
                        <social.icon className="h-6 w-6 text-gray-600" />
                        <span className="hidden font-medium text-gray-500 sm:inline">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="relative mb-20">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-md">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=17.447249876210552,78.3487203338203&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

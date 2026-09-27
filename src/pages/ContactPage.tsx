import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Check } from 'lucide-react';
import BeInspiredSection from '../components/common/BeInspiredSection';

const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect directly to WhatsApp
    const text = `Hi, I'm ${formData.name}. ${formData.message}\n\nEmail: ${formData.email}`;
    const waUrl = `https://api.whatsapp.com/send?phone=918698814865&text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#eae5da] min-h-screen text-[#222]">
      {/* Top Two Columns Section */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 sm:pt-14 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Get in Touch */}
          <div>
            <div className="mb-10">
              <h1 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal text-black font-sans tracking-tight mb-2">
                Get in Touch
              </h1>
              <div className="w-14 h-[1.5px] bg-black"></div>
            </div>

            <div className="space-y-8 text-[15px]">
              {/* Phone Number */}
              <div className="flex items-start gap-4">
                <div className="w-6 shrink-0 mt-0.5 text-black">
                  <Phone className="w-5 h-5 fill-current stroke-none" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-black leading-tight mb-1">
                    Phone Number
                  </h3>
                  <a
                    href="tel:+918698814865"
                    className="text-[#333] hover:text-black transition-colors block text-[15px]"
                  >
                    +918698814865
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-6 shrink-0 mt-0.5 text-black">
                  <Mail className="w-5 h-5 fill-current stroke-none" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-black leading-tight mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:therawprojectt@gmail.com"
                    className="text-[#333] hover:text-black transition-colors block text-[15px]"
                  >
                    therawprojectt@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-6 shrink-0 mt-0.5 text-black">
                  <MapPin className="w-5 h-5 fill-current stroke-none" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-black leading-tight mb-1">
                    Address
                  </h3>
                  <div className="text-[#333] text-[15px] leading-relaxed space-y-0.5">
                    <p>3rd Floor, The Raw Project @ Deck Spaces,</p>
                    <p>Nexus Point, Rambhoomi, College Road,</p>
                    <p>Nashik 422007</p>
                    <p>Maharashtra, IN</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-6 shrink-0 mt-0.5 text-black">
                  <Clock className="w-5 h-5 stroke-[2] text-black" />
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-black leading-tight mb-1">
                    Business Hours
                  </h3>
                  <div className="text-[#333] text-[15px] leading-relaxed space-y-1">
                    <p>Monday — Friday 9am – 5pm</p>
                    <p>Saturday — 10am – 3pm</p>
                    <p>Sunday — Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Send Us a Message */}
          <div>
            <div className="mb-10">
              <h2 className="text-[32px] md:text-[36px] font-normal text-black font-sans tracking-tight mb-2">
                Send Us a Message
              </h2>
            </div>

            {formSubmitted ? (
              <div className="p-8 bg-white border border-[#ded7ca] text-center space-y-3">
                <div className="w-12 h-12 bg-[#5c6352] text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-medium text-black">Message Sent Successfully</h4>
                <p className="text-sm text-[#555]">
                  Thank you for reaching out! Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-3 px-6 py-2 bg-[#5c6352] text-white text-xs uppercase tracking-wider hover:bg-[#4b5143] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[13px] text-[#666] mb-1.5 font-normal">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#d9d9d9] px-4 py-2.5 text-[14px] text-black placeholder:text-[#aaa] focus:outline-none focus:border-stone-500 rounded-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] text-[#666] mb-1.5 font-normal">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#d9d9d9] px-4 py-2.5 text-[14px] text-black placeholder:text-[#aaa] focus:outline-none focus:border-stone-500 rounded-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] text-[#666] mb-1.5 font-normal">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-[#d9d9d9] px-4 py-2.5 text-[14px] text-black placeholder:text-[#aaa] focus:outline-none focus:border-stone-500 rounded-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] resize-y"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#5c6352] hover:bg-[#4e5445] text-white py-3 px-6 text-[14px] font-normal transition-colors rounded-none shadow-sm cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Full-width Interactive Google Map Section */}
      <div className="w-full h-[420px] md:h-[480px] bg-[#eae5da] border-t border-[#dcd7cb] relative">
        <iframe
          title="The Raw Project Studio Location"
          src="https://maps.google.com/maps?q=Nexus%20Point%2C%20Rambhoomi%2C%20College%20Road%2C%20Nashik%20422007%2C%20Maharashtra&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full grayscale-[15%] contrast-[1.05]"
        />
      </div>

    </div>
  );
};

export default ContactPage;

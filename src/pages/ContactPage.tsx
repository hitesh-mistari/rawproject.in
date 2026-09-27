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

            <div className="space-y-10 text-[15px] pt-4">
              {/* Phone Number */}
              <div className="flex items-start gap-4">
                <div className="w-6 shrink-0 mt-0.5 text-[#8a7f72]">
                  <Phone className="w-5 h-5 fill-current stroke-none" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8a7f72] leading-tight mb-2">
                    Phone Number
                  </h3>
                  <a
                    href="tel:+918698814865"
                    className="text-[#1a1612] hover:text-[#8a6040] transition-colors block text-[16px] font-medium"
                  >
                    +918698814865
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-6 shrink-0 mt-0.5 text-[#8a7f72]">
                  <Mail className="w-5 h-5 fill-current stroke-none" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8a7f72] leading-tight mb-2">
                    Email
                  </h3>
                  <a
                    href="mailto:therawprojectt@gmail.com"
                    className="text-[#1a1612] hover:text-[#8a6040] transition-colors block text-[16px] font-medium"
                  >
                    therawprojectt@gmail.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-6 shrink-0 mt-0.5 text-[#8a7f72]">
                  <MapPin className="w-5 h-5 fill-current stroke-none" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8a7f72] leading-tight mb-2">
                    Address
                  </h3>
                  <div className="text-[#1a1612] text-[15px] leading-relaxed space-y-0.5 font-medium">
                    <p>3rd Floor, The Raw Project @ Deck Spaces,</p>
                    <p>Nexus Point, Rambhoomi, College Road,</p>
                    <p>Nashik 422007, Maharashtra, IN</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-6 shrink-0 mt-0.5 text-[#8a7f72]">
                  <Clock className="w-5 h-5 stroke-[2] text-[#8a7f72]" />
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8a7f72] leading-tight mb-2">
                    Business Hours
                  </h3>
                  <div className="text-[#1a1612] text-[15px] leading-relaxed space-y-1 font-medium">
                    <p>Monday — Friday: 9am – 5pm</p>
                    <p>Saturday: 10am – 3pm</p>
                    <p className="text-[#8a7f72]">Sunday: Closed</p>
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
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="relative pt-3">
                  <input
                    type="text"
                    required
                    id="name"
                    placeholder=" "
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="peer w-full bg-transparent border-b border-[#c2b9a7] px-0 py-2.5 text-[15px] text-[#1a1612] placeholder-transparent focus:outline-none focus:border-[#8a6040] transition-colors rounded-none"
                  />
                  <label htmlFor="name" className="absolute left-0 top-1 text-[11px] uppercase tracking-widest text-[#8a7f72] font-semibold transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#8a7f72] peer-placeholder-shown:top-6 peer-placeholder-shown:font-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-[#8a6040] peer-focus:font-semibold peer-focus:tracking-widest cursor-text">
                    Name
                  </label>
                </div>

                <div className="relative pt-3">
                  <input
                    type="email"
                    required
                    id="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="peer w-full bg-transparent border-b border-[#c2b9a7] px-0 py-2.5 text-[15px] text-[#1a1612] placeholder-transparent focus:outline-none focus:border-[#8a6040] transition-colors rounded-none"
                  />
                  <label htmlFor="email" className="absolute left-0 top-1 text-[11px] uppercase tracking-widest text-[#8a7f72] font-semibold transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#8a7f72] peer-placeholder-shown:top-6 peer-placeholder-shown:font-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-[#8a6040] peer-focus:font-semibold peer-focus:tracking-widest cursor-text">
                    Email
                  </label>
                </div>

                <div className="relative pt-3">
                  <textarea
                    rows={4}
                    required
                    id="message"
                    placeholder=" "
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="peer w-full bg-transparent border-b border-[#c2b9a7] px-0 py-2.5 text-[15px] text-[#1a1612] placeholder-transparent focus:outline-none focus:border-[#8a6040] transition-colors rounded-none resize-none"
                  />
                  <label htmlFor="message" className="absolute left-0 top-1 text-[11px] uppercase tracking-widest text-[#8a7f72] font-semibold transition-all peer-placeholder-shown:text-[14px] peer-placeholder-shown:text-[#8a7f72] peer-placeholder-shown:top-6 peer-placeholder-shown:font-normal peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-[#8a6040] peer-focus:font-semibold peer-focus:tracking-widest cursor-text">
                    Message
                  </label>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-[#1a1612] hover:bg-[#8a6040] text-white py-4 px-6 text-[12px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-[0_8px_20px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_25px_rgb(0,0,0,0.12)] cursor-pointer"
                  >
                    Send Message
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

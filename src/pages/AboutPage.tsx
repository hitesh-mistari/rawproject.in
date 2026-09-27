import React, { useEffect, useRef, useState } from 'react';
import BeInspiredSection from '../components/common/BeInspiredSection';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Ar. Amruta Bade',
    role: 'Founder & Principal Designer',
    image: '/images/about/amruta.png',
  },
  {
    name: 'Disha Rawal',
    role: 'Head Furniture Designer',
    image: '/images/about/disha.png',
  },
  {
    name: 'Sanjay Bade',
    role: 'Chief Executive Manager',
    image: '/images/about/sanjay.png',
  },
  {
    name: 'Mihir Bade',
    role: 'Project Head',
    image: '/images/about/mihir.png',
  },
];

const AboutPage: React.FC = () => {

  return (
    <div className="bg-[#EDE8DE] min-h-screen text-[#000000]">

      {/* Section 1: About Us Narrative */}
      <section className="bg-[#EDE8DE] pt-10 sm:pt-14 pb-14 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <h1 className="text-[30px] sm:text-[38px] lg:text-[45px] font-light text-black font-['IBM_Plex_Sans',sans-serif] mb-6 sm:mb-8 tracking-normal">
            About Us
          </h1>

          <div className="space-y-6 text-[16px] sm:text-[17px] font-light leading-[1.85] text-black font-['Commissioner',sans-serif] w-full text-left max-w-4xl">
            <p>
              Hello everyone, I’m Amruta, and I pour my heart and soul into The Raw Project. It’s not just a venture; it’s a passion that celebrates the raw, untouched beauty of nature and the simple elegance of minimalistic design.
            </p>

            <p>
              At The Raw Project, we believe that furniture is more than just something functional. It’s a reflection of who you are, your style, and what matters to you. Every day, we’re exploring new ideas, pushing boundaries, and bringing you pieces that are more than just furniture – they’re lasting works of art that transform the way you live.
            </p>

            <p>
              Being a devoted advocate of minimalism, I’ve personally handpicked each item in our collection to embody simplicity, practicality, and timeless charm. Our furniture isn’t just about looks; it’s about creating spaces where you can breathe, where you can connect with the untamed beauty of the natural world. We specialize in crafting exquisite live edge and rattan furniture that elevates your surroundings while championing sustainability and eco-conscious living. We’re mindful of where our materials come from, how we make our pieces, and the impact we have on our planet.
            </p>

            <p>
              When you choose The Raw Project, you’re not just bringing sophistication into your home; you’re contributing to a healthier, more conscious world. I find immense joy in seeing how our creations seamlessly blend into different spaces, each one enhancing the atmosphere and echoing the unique personality of its owner. Our commitment to quality craftsmanship and eco-friendly practices is unwavering, because we care deeply about what we do.
            </p>

            <p className="pt-2">
              Thank you for being a part of our journey.
            </p>

            <div className="pt-2 space-y-1">
              <p className="font-normal text-black">-Ar. Amruta Bade</p>
              <p className="font-normal text-black">Founder &amp; Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Meet Our Team */}
      <section className="bg-white py-14 sm:py-20 border-t border-[#e2dcd2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-[26px] sm:text-[34px] md:text-[40px] font-light text-black font-['IBM_Plex_Sans',sans-serif] text-center mb-10 sm:mb-14 tracking-tight">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#EDE8DE] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg group"
              >
                {/* Member Portrait */}
                <div className="w-full aspect-[3/4] overflow-hidden bg-[#e0dad0]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Member Details */}
                <div className="bg-[#EDE8DE] py-4 sm:py-7 px-2 sm:px-4 text-center flex flex-col justify-center items-center flex-grow">
                  <h3 className="font-['IBM_Plex_Sans',sans-serif] text-[15px] sm:text-[20px] font-normal text-[#222222] mb-1 sm:mb-1.5 tracking-[0.2px]">
                    {member.name}
                  </h3>
                  <p className="font-['IBM_Plex_Sans',sans-serif] text-[11px] sm:text-[14px] font-normal text-[#4A4A4A] tracking-[0.7px]">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;

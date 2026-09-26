import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import BeInspiredSection from '../components/common/BeInspiredSection';

const PolicyPage: React.FC = () => {
  const { pathname } = useLocation();

  let title = 'Shipping Policy';
  let content = (
    <div className="space-y-4 text-sm text-[#333] leading-relaxed">
      <p>
        At <strong>The Raw Project</strong>, each piece of furniture is handcrafted to order by skilled artisans in solid Indian Teak wood and natural cane. Due to the bespoke nature of our craftsmanship, please allow 3 to 4 weeks for production and finishing.
      </p>
      <h3 className="text-base font-serif text-black pt-2 font-medium">Pan-India White Glove Delivery</h3>
      <p>
        We partner with specialized furniture transport handlers to ensure your pieces arrive in pristine condition. Deliveries include doorstep inspection and unpacking service in major metropolitan cities.
      </p>
      <h3 className="text-base font-serif text-black pt-2 font-medium">Tracking &amp; Logistics</h3>
      <p>
        Once your piece leaves our atelier, you will receive real-time consignment tracking via SMS and WhatsApp. Our logistics coordinator will schedule a convenient delivery appointment with you prior to arrival.
      </p>
    </div>
  );

  if (pathname.includes('terms')) {
    title = 'Terms of Service';
    content = (
      <div className="space-y-4 text-sm text-[#333] leading-relaxed">
        <p>
          Welcome to The Raw Project. By accessing and purchasing from our atelier, you agree to comply with our design terms and craftsmanship policies.
        </p>
        <h3 className="text-base font-serif text-black pt-2 font-medium">Natural Material Variations</h3>
        <p>
          Natural Indian Teak wood and handwoven cane inherently display individual grain patterns, subtle tonal shifts, and authentic variations. These are not imperfections; they are the hallmark of honest, living materials and artisanal heritage.
        </p>
        <h3 className="text-base font-serif text-black pt-2 font-medium">2-Year Structural Warranty</h3>
        <p>
          We stand by the longevity of our creations. Every piece carries a 2-year warranty covering joinery integrity and structural craftsmanship.
        </p>
      </div>
    );
  } else if (pathname.includes('cancellation') || pathname.includes('refund')) {
    title = 'Cancellation & Refund Policy';
    content = (
      <div className="space-y-4 text-sm text-[#333] leading-relaxed">
        <p>
          Because every piece is handcrafted bespoke upon order placement, cancellations can only be accommodated within 48 hours of order confirmation.
        </p>
        <h3 className="text-base font-serif text-black pt-2 font-medium">Transit Damage Replacement</h3>
        <p>
          In the unlikely event of transit damage, please record and report it to our delivery team immediately upon inspection. We will promptly repair or replace the affected piece at zero cost to you.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#eae5da] min-h-screen pt-12 pb-20">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 mb-12">
        <h1 className="text-[32px] font-normal text-[#1a1a1a] mb-2 font-serif">{title}</h1>
        <div className="text-[13px] text-[#555] mb-8">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">&gt;</span>
          <span>{title}</span>
        </div>

        <div className="bg-white/80 p-10 border border-[#ded7ca] shadow-sm">
          {content}
        </div>
      </div>

      <BeInspiredSection />
    </div>
  );
};

export default PolicyPage;
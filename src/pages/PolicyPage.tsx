import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import BeInspiredSection from '../components/common/BeInspiredSection';

const PolicyPage: React.FC = () => {
  const { pathname } = useLocation();

  let title = 'Shipping Policy';
  let content = (
    <div className="space-y-4 text-sm text-[#333] leading-relaxed">
      <h3 className="text-base font-serif text-black pt-2 font-medium">Order Processing and Custom Delivery Times</h3>
      <p>
        All orders are processed within 1-3 business days. Our shipping policy includes custom delivery times based on the specifics of each order. Once your order is confirmed, we will provide you with an estimated delivery time frame tailored to your purchase.
      </p>
      
      <h3 className="text-base font-serif text-black pt-4 font-medium">Free Shipping</h3>
      <p>
        We are delighted to offer free shipping on all orders, regardless of size or value.
      </p>
      
      <h3 className="text-base font-serif text-black pt-4 font-medium">Shipment Confirmation &amp; Order Tracking</h3>
      <p>
        You will receive a Shipment Confirmation email once your order has been processed, including your tracking number(s). The tracking information will be active within 24 hours.
      </p>
    </div>
  );

  if (pathname.includes('terms')) {
    title = 'Terms of Service';
    content = (
      <div className="space-y-4 text-sm text-[#333] leading-relaxed">
        <p><strong>Introduction:</strong> Welcome to The Raw Project (referred to as “we,” “our,” or “us”). These Terms of Service (“Terms”) govern your use of our website, services, and any products purchased from us. By accessing and using our website, you agree to comply with and be bound by these Terms. Please read them carefully before proceeding with your use of our services.</p>
        
        <h3 className="text-base font-serif text-black pt-4 font-medium">Use of the Website:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your use of this website is subject to these Terms.</li>
          <li>You must be at least 18 years old or have legal capacity to enter into contracts to use this website.</li>
          <li>You agree not to use this website for any unlawful purpose.</li>
        </ul>
        
        <h3 className="text-base font-serif text-black pt-4 font-medium">Privacy Policy:</h3>
        <p>Please review our <Link to="/privacy-policy" className="underline hover:text-black">Privacy Policy</Link>, which also governs your use of our website and services. By using our website, you consent to the collection and use of your information as described in our Privacy Policy.</p>
        
        <h3 className="text-base font-serif text-black pt-4 font-medium">Orders and Purchases:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>When you place an order with us, you are making an offer to purchase the products in your cart.</li>
          <li>We reserve the right to accept or reject your order for any reason.</li>
          <li>All prices are in Rupees and are subject to change without notice.</li>
        </ul>

        <h3 className="text-base font-serif text-black pt-4 font-medium">Payment Terms:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>You agree to pay the full amount due for your order, including any applicable taxes and shipping fees.</li>
          <li>We accept various payment methods, as specified on our Payment Methods page.</li>
        </ul>

        <h3 className="text-base font-serif text-black pt-4 font-medium">Shipping and Delivery:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Shipping and delivery terms are detailed on our <Link to="/shipping-policy" className="underline hover:text-black">Shipping and Delivery</Link> page.</li>
          <li>Delivery times are approximate and may vary based on location and other factors.</li>
        </ul>

        <h3 className="text-base font-serif text-black pt-4 font-medium">Returns and Refunds:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Our Return and Refund policy is outlined on our Returns and Refunds page.</li>
          <li>Products must be returned in their original condition to qualify for a refund or exchange.</li>
        </ul>

        <h3 className="text-base font-serif text-black pt-4 font-medium">Intellectual Property:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>All content on this website, including images, text, logos, and graphics, is our intellectual property.</li>
          <li>You may not use our content without our written consent.</li>
        </ul>

        <h3 className="text-base font-serif text-black pt-4 font-medium">Limitation of Liability:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>We are not liable for any direct, indirect, or consequential damages resulting from your use of this website or any products purchased from us.</li>
          <li>We do not guarantee that our website will be free from errors or interruptions.</li>
        </ul>

        <h3 className="text-base font-serif text-black pt-4 font-medium">Termination:</h3>
        <p>We reserve the right to terminate your access to our website and services at our discretion.</p>

        <h3 className="text-base font-serif text-black pt-4 font-medium">Governing Law:</h3>
        <p>These Terms are governed by and interpreted in accordance with the laws of Maharashtra, India, and you agree to submit to the exclusive jurisdiction of the courts located within Maharashtra, India.</p>

        <h3 className="text-base font-serif text-black pt-4 font-medium">Changes to the Terms:</h3>
        <p>We may update these Terms from time to time. Please review these Terms periodically for any changes.</p>

        <h3 className="text-base font-serif text-black pt-4 font-medium">Contact Information:</h3>
        <p>If you have any questions or concerns about these Terms, please contact us using the following information:</p>
        <ul className="space-y-1">
          <li><strong>Customer Support Email:</strong> <a href="mailto:therawprojectt@gmail.com" className="underline hover:text-black">therawprojectt@gmail.com</a></li>
          <li><strong>Customer Support Phone:</strong> <a href="tel:+918698814865" className="underline hover:text-black">+91 8698814865</a></li>
        </ul>
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
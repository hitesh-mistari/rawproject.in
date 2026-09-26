import React from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  comment: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aarav Mehra",
    role: "Principal Architect",
    location: "Worli, Mumbai",
    comment: "The precision in proportion and texture customization from Raw Project is unparalleled. They executed an 11-foot custom curved modular sofa for our sea-facing penthouse flawlessly.",
    project: "Living Room Penthouse Suite",
  },
  {
    id: 2,
    name: "Tara Singhania",
    role: "Interior Designer",
    location: "Vasant Vihar, New Delhi",
    comment: "Finding solid timber furniture with contemporary, understated silhouettes is rare. The wood joinery, finish, and fabric upholstery exceeded our client's rigorous expectations.",
    project: "Residence 42 Renovation",
  },
  {
    id: 3,
    name: "Vikram & Ananya Patel",
    role: "Homeowners",
    location: "Jubilee Hills, Hyderabad",
    comment: "From sending physical fabric swatches to white-glove installation inside our home, the experience was seamless. The dining table is the absolute crown jewel of our home.",
    project: "Custom Marble & Oak Dining Suite",
  },
];

const ReviewsSection: React.FC = () => {
  return (
    <section className="section-padding bg-sand-100/60 border-t border-b border-sand-200">
      <div className="container-custom">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold block mb-2">
            Client Voices
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium">
            Designed for Elevated Living
          </h2>
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 border border-sand-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-gold-500 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-sand-300 stroke-[1.5] mb-2" />
                <p className="text-stone-700 text-sm font-light leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-sand-200">
                <h4 className="font-serif text-stone-900 font-semibold text-base">
                  {t.name}
                </h4>
                <p className="text-xs text-stone-500 font-light mt-0.5">
                  {t.role} • {t.location}
                </p>
                <span className="inline-block mt-2 text-[10px] uppercase tracking-wider text-gold-700 bg-sand-100 px-2 py-0.5 font-medium">
                  {t.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

const fs = require('fs');
const file = '/Users/mac/projects/rawproject/src/pages/CategoryPage.tsx';
let code = fs.readFileSync(file, 'utf8');

const bannerFunction = `
  const getBannerImage = (category: string) => {
    switch (category) {
      case 'dining': return '/images/home/be-inspired/be3.jpg';
      case 'living': return '/images/home/be-inspired/be1.jpg';
      case 'bedroom': return '/images/home/inspiration/7.jpg';
      case 'storage': return '/images/home/be-inspired/be2.jpg';
      case 'decor': return '/images/home/inspiration/4.jpg';
      case 'seating': return '/images/home/be-inspired/be4.jpg';
      default: return '/images/home/hero/hero_slide1.jpg';
    }
  };
`;

// Inject the function before return
code = code.replace(
  '  return (',
  bannerFunction + '\n  return ('
);

const oldSection = `<section className="bg-[#1a1612] text-[#eae5da] pt-24 pb-20 px-6 sm:px-12 text-center relative overflow-hidden">
        <div className="max-w-[800px] mx-auto relative z-10">`;

const newSection = `<section 
        className="bg-[#1a1612] text-[#eae5da] pt-32 pb-24 px-6 sm:px-12 text-center relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: \`url(\${getBannerImage(activeCat)})\` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="max-w-[800px] mx-auto relative z-10">`;

code = code.replace(oldSection, newSection);

fs.writeFileSync(file, code);

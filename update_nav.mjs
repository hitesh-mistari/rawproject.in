import fs from 'fs';

const filePath = '/Users/mac/projects/rawproject/src/components/layout/Header.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const navStart = content.indexOf('<nav className="hidden md:flex items-center gap-6 lg:gap-10 mt-1">');
const navEnd = content.indexOf('</nav>', navStart) + 6;

const originalNav = content.slice(navStart, navEnd);

// Keep the dropdown but change "COLLECTIONS" to "SHOP", and rearrange the items.
// We'll extract the dropdown block.
const dropdownStart = originalNav.indexOf('{/* Shop (Collections) Dropdown */}');
const dropdownEndMatch = originalNav.match(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/div>/);
const dropdownEnd = dropdownEndMatch.index + dropdownEndMatch[0].length;
let dropdown = originalNav.slice(dropdownStart, dropdownEnd);

// Replace "COLLECTIONS" with "SHOP"
dropdown = dropdown.replace('COLLECTIONS', 'SHOP');

const newNav = `<nav className="hidden md:flex items-center gap-6 lg:gap-10 mt-1">
            <Link to="/about" className="text-[12px] tracking-[0.1em] text-[#666] hover:text-black font-medium transition-colors uppercase">
              ABOUT
            </Link>
            <Link to="/experience-centre" className="text-[12px] tracking-[0.1em] text-[#666] hover:text-black font-medium transition-colors uppercase">
              EXPERIENCE CENTRE
            </Link>
            
            ${dropdown}

            <Link to="/news" className="text-[12px] tracking-[0.1em] text-[#666] hover:text-black font-medium transition-colors uppercase">
              NEWS
            </Link>
            <Link to="/get-in-touch" className="text-[12px] tracking-[0.1em] text-[#666] hover:text-black font-medium transition-colors uppercase">
              GET IN TOUCH
            </Link>
          </nav>`;

content = content.replace(originalNav, newNav);
fs.writeFileSync(filePath, content);
console.log("Updated Desktop Nav!");

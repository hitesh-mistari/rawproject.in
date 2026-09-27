const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

content = content.replace(
  '{isShopOpen && (\n                <div \n                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 z-50 animate-fadeIn"',
  '<div \n                  ref={megaMenuRef}\n                  className="absolute top-full left-1/2 -translate-x-1/2 mt-5 z-50 opacity-0 hidden"\n                  style={{ display: "none" }}'
);

content = content.replace(
  'className="flex flex-col min-w-[140px]"',
  'className="flex flex-col min-w-[140px] mega-menu-col"'
);

content = content.replace(
  'className="hidden lg:block w-[320px] bg-[#eae5da] relative overflow-hidden group border border-[#dfdbd2]"',
  'className="hidden lg:block w-[320px] bg-[#eae5da] relative overflow-hidden group border border-[#dfdbd2] mega-menu-featured"'
);

content = content.replace(
  '                </div>\n              )}',
  '                </div>\n              </div>'
);

fs.writeFileSync('src/components/layout/Header.tsx', content);

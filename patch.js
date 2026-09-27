const fs = require('fs');
const content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

const updated = content.replace(
  'COLLECTIONS\n                <ChevronDown',
  '<div className="flex items-center gap-1.5">\n                  COLLECTIONS\n                  <ChevronDown'
).replace(
  'isShopOpen ? \'rotate-180\' : \'\'}`} />\n              </HoverUnderlineLink>',
  'isShopOpen ? \'rotate-180\' : \'\'}`} />\n                </div>\n              </HoverUnderlineLink>'
).replace(
  'flex items-center gap-1.5 py-1 ${',
  'py-1 ${'
);

fs.writeFileSync('src/components/layout/Header.tsx', updated);

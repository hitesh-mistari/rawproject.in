const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

content = content.replace(
  '                </div>\n              </div>\n            </div>\n\n            <HoverUnderlineLink to="/news"',
  '                </div>\n            </div>\n\n            <HoverUnderlineLink to="/news"'
);

fs.writeFileSync('src/components/layout/Header.tsx', content);

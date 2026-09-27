import re

with open('src/pages/HomePage.tsx', 'r') as f:
    content = f.read()

# We will split the file by section markers. 
# It's safer to use the exact comments to slice the string.

markers = [
    "{/* 1.5. WORKS OF QUIET ELEGANCE - 100VH ARCHITECTURAL SHOWCASE SECTION */}",
    "{/* 2. OUR PROCESS SECTION */}",
    "{/* 2.5 FEATURED PRODUCTS CAROUSEL */}",
    "{/* 3. INSPIRATION SECTION */}",
    "{/* 4. FOLLOW OUR JOURNEY - ON INSTAGRAM */}",
    "{/* 5. WHY THE RAW PROJECT SECTION */}",
    "{/* 6. NEED DESIGN ADVICE ? */}",
    "    </div>\n  );\n};\n\nexport default HomePage;"
]

indices = [content.find(m) for m in markers]

# Extract blocks
prefix = content[:indices[0]]
works = content[indices[0]:indices[1]]
process = content[indices[1]:indices[2]]
products = content[indices[2]:indices[3]]
inspiration = content[indices[3]:indices[4]]
instagram = content[indices[4]:indices[5]]
why = content[indices[5]:indices[6]]
advice = content[indices[6]:indices[7]]
suffix = content[indices[7]:]

# New order: Products -> Works -> Inspiration -> Why -> Process -> Instagram -> Advice
new_content = prefix + products + works + inspiration + why + process + instagram + advice + suffix

with open('src/pages/HomePage.tsx', 'w') as f:
    f.write(new_content)

print("Reordering done.")

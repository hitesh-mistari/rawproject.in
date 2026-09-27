import re

with open('src/pages/HomePage.tsx', 'r') as f:
    content = f.read()

markers = [
    "{/* 2.5 FEATURED PRODUCTS CAROUSEL */}",
    "{/* 1.5. WORKS OF QUIET ELEGANCE - 100VH ARCHITECTURAL SHOWCASE SECTION */}",
    "{/* 3. INSPIRATION SECTION */}",
    "{/* 5. WHY THE RAW PROJECT SECTION */}",
    "{/* 2. OUR PROCESS SECTION */}",
    "{/* 4. FOLLOW OUR JOURNEY - ON INSTAGRAM */}",
    "{/* 6. NEED DESIGN ADVICE ? */}",
    "    </div>\n  );\n};\n\nexport default HomePage;"
]

indices = [content.find(m) for m in markers]

prefix = content[:indices[0]]
A = content[indices[0]:indices[1]] # Featured Products
B = content[indices[1]:indices[2]] # Works of Quiet Elegance
C = content[indices[2]:indices[3]] # Inspiration
D = content[indices[3]:indices[4]] # Why the raw project
E = content[indices[4]:indices[5]] # Our Process
F = content[indices[5]:indices[6]] # Instagram
G = content[indices[6]:indices[7]] # Advice
suffix = content[indices[7]:]

# New order: B, C, D, A, E, F, G
new_content = prefix + B + C + D + A + E + F + G + suffix

with open('src/pages/HomePage.tsx', 'w') as f:
    f.write(new_content)

print("Reordering done.")

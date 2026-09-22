import os
import re

files_to_update = ['contracts.html', 'pest-control.html', 'steam-cleaning.html', 'sterilization.html', 'tank-cleaning.html']

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to find the portfolio section and the pricing start tag if they are on the same line
    portfolio_pattern = r'(<section class="section portfolio" id="portfolio">.*?</section>)(<section class="section pricing" id="pricing"[^>]*>)'
    
    match = re.search(portfolio_pattern, content)
    if not match:
        print(f"Pattern not found in {filepath}")
        continue
        
    portfolio_html = match.group(1)
    pricing_start = match.group(2)
    
    # Remove portfolio from its current position and just leave pricing start
    content = content.replace(match.group(0), pricing_start)
    
    # Now we need to find the end of the pricing section.
    # We can do this by finding the pricing section and its matching closing tag, OR
    # simply by finding the next section after pricing, like `<!-- Portfolio Section -->` or `<section class="section about-company"`.
    
    # Looking at the file, the next section is usually about-company or something similar.
    # Let's try to find the closing </section> of the pricing section.
    # A simple way is to find the pricing start tag and count the tags.
    # Or find the section that immediately follows pricing.
    # Let's search for the ID "about" or similar that follows pricing.
    
    # A robust way is to just look for the first </section> followed by a known next section, like <section class="section about-company"
    # Or we know pricing ends right before `<section class="section about-company"` or `<!--` 
    
    # Let's write a simple tag matcher
    pricing_idx = content.find(pricing_start)
    
    # count <section and </section> from pricing_idx
    depth = 0
    i = pricing_idx
    end_idx = -1
    
    # basic tag parsing
    while i < len(content):
        if content[i:].startswith('<section'):
            depth += 1
            i += 8
        elif content[i:].startswith('</section>'):
            depth -= 1
            if depth == 0:
                end_idx = i + 10
                break
            i += 10
        else:
            i += 1
            
    if end_idx != -1:
        # Insert portfolio_html after end_idx
        # let's add a newline and portfolio section
        new_content = content[:end_idx] + '\n' + portfolio_html + content[end_idx:]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find end of pricing section in {filepath}")


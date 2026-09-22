import os
from datetime import datetime

base_url = "https://www.amadco-sa.com"
html_files = [
    "index.html",
    "pest-control.html",
    "sterilization.html",
    "steam-cleaning.html",
    "tank-cleaning.html",
    "contracts.html",
]

priorities = {
    "index.html": "1.0",
    "pest-control.html": "0.9",
    "tank-cleaning.html": "0.9",
    "sterilization.html": "0.8",
    "steam-cleaning.html": "0.8",
    "contracts.html": "0.7",
}

frequencies = {
    "index.html": "weekly",
    "pest-control.html": "monthly",
    "tank-cleaning.html": "monthly",
    "sterilization.html": "monthly",
    "steam-cleaning.html": "monthly",
    "contracts.html": "monthly",
}

def generate_sitemap():
    today = datetime.now().strftime("%Y-%m-%d")
    
    sitemap_content = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]
    
    for filename in html_files:
        url = f"{base_url}/{filename}" if filename != "index.html" else f"{base_url}/"
        priority = priorities.get(filename, "0.5")
        freq = frequencies.get(filename, "monthly")
        
        url_entry = f"""
  <url>
    <loc>{url}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>"""
        sitemap_content.append(url_entry)
        
    sitemap_content.append('</urlset>')
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write("\n".join(sitemap_content))
        
    print("sitemap.xml generated successfully.")

if __name__ == "__main__":
    generate_sitemap()

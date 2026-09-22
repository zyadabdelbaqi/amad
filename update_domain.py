import os
import glob

old_domain = "https://amadco.com.sa"
new_domain = "https://www.amadco-sa.com"

# files to update
files = glob.glob("*.html") + ["add_seo.py", "generate_sitemap.py", "robots.txt", "sitemap.xml"]

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if old_domain in content:
            new_content = content.replace(old_domain, new_domain)
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")

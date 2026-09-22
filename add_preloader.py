import glob

preloader_html = """<body>
<div class="preloader" id="preloader">
    <img src="./logo/logo_new.webp" alt="شركة أمدكو" class="preloader-logo">
</div>"""

for html_file in glob.glob("*.html"):
    with open(html_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    if "id=\"preloader\"" not in content:
        content = content.replace("<body>", preloader_html, 1)
        
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(content)
            print(f"Added preloader to {html_file}")

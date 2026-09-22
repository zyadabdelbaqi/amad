import os
import glob
import re

# 1. Update script.js
with open("script.js", "r", encoding="utf-8") as f:
    js_content = f.read()

js_insert = """        mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
        const mobileDropdownBtns = document.querySelectorAll(".mobile-dropdown-btn");
        mobileDropdownBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                btn.parentElement.classList.toggle("active");
            });
        });"""

js_content = js_content.replace("mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));", js_insert)

with open("script.js", "w", encoding="utf-8") as f:
    f.write(js_content)

# 2. Update all HTML files
new_mobile_menu = """<button class="mobile-close" id="mobileClose"><i class="fas fa-times"></i></button>
<a href="index.html#hero">الرئيسية</a>
<div class="mobile-dropdown">
    <button class="mobile-dropdown-btn">جميع الخدمات <i class="fas fa-chevron-down"></i></button>
    <div class="mobile-dropdown-content">
        <a href="pest-control.html">مكافحة الحشرات</a>
        <a href="sterilization.html">التعقيم</a>
        <a href="steam-cleaning.html">التنظيف بالبخار</a>
        <a href="tank-cleaning.html">تنظيف الخزانات</a>
        <a href="contracts.html">العقود السنوية</a>
    </div>
</div>
<a href="index.html#about">عن الشركة</a>
<a href="index.html#why-us">لماذا أمدكو</a>
<a href="index.html#contact">تواصل معنا</a>"""

for file in glob.glob("*.html"):
    with open(file, "r", encoding="utf-8") as f:
        html = f.read()
    
    # Replace the contents of <div class="mobile-menu" id="mobileMenu">
    html = re.sub(
        r"(<div class=\"mobile-menu\" id=\"mobileMenu\">)(.*?)(</div>\s*<section class=\"hero)", 
        r"\1\n" + new_mobile_menu + r"\n</div>\n<section class=\"hero", 
        html, 
        flags=re.DOTALL
    )
    
    with open(file, "w", encoding="utf-8") as f:
        f.write(html)

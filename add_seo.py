import os
import re

base_url = "https://www.amadco-sa.com"
company_name = "أمدكو للخدمات المنزلية"
whatsapp_number = "966545759422"

html_files = [
    "index.html",
    "pest-control.html",
    "sterilization.html",
    "steam-cleaning.html",
    "tank-cleaning.html",
    "contracts.html",
]

page_data = {
    "index.html": {
        "title": "أمدكو - شركة أمد الأولى للخدمات المنزلية في السعودية",
        "description": "شركة أمد الأولى للخدمات المنزلية (أمدكو) تقدم أفضل خدمات مكافحة الحشرات، تنظيف الخزانات، التعقيم، والنظافة بالبخار بأعلى جودة.",
        "keywords": "شركة أمد الأولى, أمدكو, خدمات منزلية, مكافحة حشرات, تنظيف خزانات, تعقيم منازل, السعودية"
    },
    "pest-control.html": {
        "title": "مكافحة حشرات ورش مبيدات - شركة أمدكو",
        "description": "خدمات مكافحة حشرات شاملة للقضاء على الصراصير، النمل الأبيض، البق والفئران مع ضمان الجودة من شركة أمدكو.",
        "keywords": "مكافحة حشرات, رش مبيدات, ابادة حشرات, صراصير, بق الفراش, نمل ابيض, شركة أمدكو"
    },
    "sterilization.html": {
        "title": "تعقيم المنازل والشركات ضد الفيروسات - شركة أمدكو",
        "description": "خدمات تعقيم شاملة للمنازل والمكاتب بأحدث المواد المصرح بها للقضاء على البكتيريا والفيروسات.",
        "keywords": "تعقيم منازل, تعقيم شركات, تطهير, فيروسات, بكتيريا, شركة تعقيم, أمدكو"
    },
    "steam-cleaning.html": {
        "title": "تنظيف الأثاث والسجاد بالبخار - شركة أمدكو",
        "description": "خدمات تنظيف الأثاث، السجاد، والمفروشات بالبخار لإزالة البقع الصعبة والروائح الكريهة مع التعقيم العميق.",
        "keywords": "تنظيف بالبخار, غسيل كنب, تنظيف سجاد, غسيل مفروشات, أمدكو"
    },
    "tank-cleaning.html": {
        "title": "تنظيف وتعقيم خزانات المياه - شركة أمدكو",
        "description": "خدمات تنظيف، تعقيم، وعزل خزانات المياه لضمان مياه نقية وصحية خالية من الشوائب والبكتيريا.",
        "keywords": "تنظيف خزانات, تعقيم خزانات, عزل خزانات, غسيل خزانات مياه, شركة أمدكو"
    },
    "contracts.html": {
        "title": "العقود السنوية للخدمات المنزلية والتجارية - أمدكو",
        "description": "احصل على راحة البال مع عقود أمدكو السنوية التي تشمل زيارات دورية لمكافحة الحشرات والنظافة الشاملة.",
        "keywords": "عقود سنوية, عقود صيانة, مكافحة حشرات دورية, خدمات شركات, عقود نظافة"
    }
}

schema_ld = f"""
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{company_name}",
  "image": "{base_url}/logo/logo_new.webp",
  "@id": "{base_url}",
  "url": "{base_url}",
  "telephone": "+{whatsapp_number}",
  "address": {{
    "@type": "PostalAddress",
    "streetAddress": "طريق الأمير سلطان، برج المرجانة",
    "addressLocality": "جدة",
    "addressRegion": "مكة المكرمة",
    "addressCountry": "SA"
  }},
  "openingHoursSpecification": {{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Saturday",
      "Sunday"
    ],
    "opens": "08:00",
    "closes": "22:00"
  }},
  "sameAs": [
    "https://wa.me/{whatsapp_number}"
  ]
}}
</script>
"""

def inject_seo(filepath, filename):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if we already injected SEO by checking if og:title exists
    if 'property="og:title"' in content or 'name="description"' in content:
        print(f"[{filename}] SEO tags already exist. Skipping to avoid duplicates.")
        # But we might need to remove old <title> and update. For simplicity, let's just do it if missing.
        # Actually, let's remove existing <title> and <meta name="description"> if they exist to be safe.
        pass

    data = page_data.get(filename, page_data["index.html"])
    page_url = f"{base_url}/{filename}" if filename != "index.html" else f"{base_url}/"

    seo_tags = f"""
    <!-- SEO Meta Tags -->
    <meta name="description" content="{data['description']}">
    <meta name="keywords" content="{data['keywords']}">
    <meta name="author" content="{company_name}">
    <link rel="canonical" href="{page_url}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{page_url}">
    <meta property="og:title" content="{data['title']}">
    <meta property="og:description" content="{data['description']}">
    <meta property="og:image" content="{base_url}/logo/logo_new.webp">
    <meta property="og:locale" content="ar_SA">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{page_url}">
    <meta name="twitter:title" content="{data['title']}">
    <meta name="twitter:description" content="{data['description']}">
    <meta name="twitter:image" content="{base_url}/logo/logo_new.webp">

    {schema_ld}
    """

    # Replace existing title
    content = re.sub(r'<title>.*?</title>', f'<title>{data["title"]}</title>', content, flags=re.DOTALL | re.IGNORECASE)

    # Insert seo tags before </head>
    if '<!-- SEO Meta Tags -->' not in content:
        content = content.replace('</head>', f'{seo_tags}\n</head>')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"[{filename}] Injected SEO tags successfully.")
    else:
        print(f"[{filename}] SEO tags already injected.")

if __name__ == "__main__":
    for html_file in html_files:
        filepath = os.path.join(os.getcwd(), html_file)
        if os.path.exists(filepath):
            inject_seo(filepath, html_file)
        else:
            print(f"File not found: {filepath}")

print("SEO injection complete.")

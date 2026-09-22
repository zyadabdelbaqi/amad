import os
import glob
import shutil
import re
from PIL import Image

artifact_dir = "/home/ziadabdelbaqi/.gemini/antigravity-ide/brain/d19065fe-da4d-4ca0-8c04-aa71c7e38190"
dest_dir = "./images/icons"
os.makedirs(dest_dir, exist_ok=True)

icons_map = {
    "pest_control_icon": "pest-control.html",
    "sterilization_icon": "sterilization.html",
    "steam_cleaning_icon": "steam-cleaning.html",
    "tank_cleaning_icon": "tank-cleaning.html",
    "contracts_icon": "contracts.html"
}

for icon_prefix, html_file in icons_map.items():
    # Find the generated image
    pattern = os.path.join(artifact_dir, f"{icon_prefix}_*.jpg")
    matches = glob.glob(pattern)
    if not matches:
        print(f"Could not find generated image for {icon_prefix}")
        continue
    
    # Take the latest if multiple
    source_img = sorted(matches)[-1]
    
    # Convert to webp and save to dest_dir
    dest_path = os.path.join(dest_dir, f"{icon_prefix}.webp")
    
    try:
        img = Image.open(source_img)
        # Resize to a reasonable icon size, e.g. 200x200
        img.thumbnail((250, 250), Image.Resampling.LANCZOS)
        img.save(dest_path, "webp", quality=85)
        print(f"Saved {dest_path}")
        
        # Update HTML file
        with open(html_file, "r", encoding="utf-8") as f:
            html = f.read()
            
        # The current HTML has <div class="hero-icon-container..."><i class="..."></i></div>
        # We want to replace it with <img src="./images/icons/{icon_prefix}.webp" class="service-hero-icon" alt="Service Icon" />
        
        img_tag = f'<img src="./images/icons/{icon_prefix}.webp" class="service-hero-icon" alt="أيقونة الخدمة" />'
        
        # Replace the hero-icon-container div block
        # We can use regex to match the <div class="hero-icon-container"...>...</div>
        html = re.sub(r'<div class="hero-icon-container[^>]*>.*?</div>', img_tag, html, flags=re.DOTALL)
        
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(html)
            
    except Exception as e:
        print(f"Error processing {icon_prefix}: {e}")

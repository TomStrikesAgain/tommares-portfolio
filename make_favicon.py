import sys
try:
    from PIL import Image, ImageDraw
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw

img_path = "/Users/tomhome/.gemini/antigravity/brain/ea2a3963-d5a6-4338-bd31-61f6c8318a40/tm_logo_purple_cream_1788249235599.jpg"
img = Image.open(img_path).convert("RGBA")

# Create a circular mask
mask = Image.new('L', img.size, 0)
draw = ImageDraw.Draw(mask)
# Find the bounding box of the purple circle.
gray = img.convert("L")
bw = gray.point(lambda x: 0 if x > 240 else 255, '1')
bbox = bw.getbbox()

if bbox:
    # Slightly shrink the bounding box to avoid white fringes
    b_margin = 2
    b = (bbox[0]+b_margin, bbox[1]+b_margin, bbox[2]-b_margin, bbox[3]-b_margin)
    draw.ellipse(b, fill=255)
else:
    # fallback
    draw.ellipse((50, 50, img.size[0]-50, img.size[1]-50), fill=255)

# apply mask
result = img.copy()
result.putalpha(mask)

# Save as icon.png in the app directory
result.save("/Users/tomhome/Development/tommares-portfolio/src/app/icon.png", "PNG")
# Overwrite the default favicon.ico
result.resize((256, 256)).save("/Users/tomhome/Development/tommares-portfolio/src/app/favicon.ico", format="ICO", sizes=[(256, 256)])
print("Favicon created!")

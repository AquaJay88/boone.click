import re

with open('store/about.html', 'r') as f:
    content = f.read()

# Replace image with canvas
content = content.replace('<img src="../John Boone Suit (no background).png" alt="John Boone" class="hero-portrait-float">', '<canvas id="hero-canvas" class="hero-portrait-float" style="aspect-ratio: 3/4;"></canvas>')

# Remove the masked-text completely
masked_start = content.find('<div class="hero-text masked-text hero-layout-wrap" aria-hidden="true">')
masked_end = content.find('</div>\n        </div>\n      </section>')
if masked_start != -1 and masked_end != -1:
    content = content[:masked_start] + content[masked_end:]

# Add script tags into head
head_insert = """  <!-- Include a lightweight icon set -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="cart.js" type="text/javascript"></script>

  <!-- GSAP -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

  <!-- Three.js Import Map -->
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
        "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
      }
    }
  </script>"""

content = content.replace("""  <!-- Include a lightweight icon set -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="cart.js" type="text/javascript"></script>""", head_insert)


# Add floating cart menu script
footer_insert = """  <!-- 3D Animation Script -->
  <script type="module" src="about-3d.js"></script>

  <!-- Floating Cart Menu -->"""

content = content.replace("""  <!-- Floating Cart Menu -->""", footer_insert)

with open('store/about.html', 'w') as f:
    f.write(content)

print("Patched!")

with open('store/about-3d.js', 'r') as f:
    content = f.read()

content = content.replace("const meshesArray = [];\nlet modelLoaded = false;", "let modelLoaded = false;")

with open('store/about-3d.js', 'w') as f:
    f.write(content)

print("Removed first meshesArray")

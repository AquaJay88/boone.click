with open('store/about-3d.js', 'r') as f:
    content = f.read()

content = content.replace("  // Setup raycaster\n  setupRaycaster(ties, trains);", "")

with open('store/about-3d.js', 'w') as f:
    f.write(content)

print("Removed undefined setupRaycaster call")

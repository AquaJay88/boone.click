with open('store/about-3d.js', 'r') as f:
    content = f.read()

content = content.replace("camera.position.set(0, 10, 20);", "camera.position.set(0, 150, 300);")
content = content.replace("const waveRadius = 15;", "const waveRadius = 150;")
content = content.replace("const maxLift = 3;", "const maxLift = 30;")


with open('store/about-3d.js', 'w') as f:
    f.write(content)

print("Adjusted camera distance, the model might be very large!")

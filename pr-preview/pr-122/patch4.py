with open('store/about-3d.js', 'r') as f:
    content = f.read()

content = content.replace("const meshes = [];", "const meshesArray = [];", 1) # Only the first one which is inside the load callback

# Remove the outer const meshes = []; entirely as it is unused. Let's just do a manual replace
import re
content = re.sub(r'// Object holders\nconst meshes = \[\];\nlet modelLoaded = false;', '// Object holders\nlet modelLoaded = false;', content)
content = content.replace('const meshes = [];', 'const meshesArray = [];', 1)
content = content.replace('meshes.push(child);', 'meshesArray.push(child);')
content = content.replace('meshes.forEach(mesh => {', 'meshesArray.forEach(mesh => {')

with open('store/about-3d.js', 'w') as f:
    f.write(content)

print("Fixed meshes variable shadowing")

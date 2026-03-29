with open('store/index.html', 'r') as f:
    content = f.read()

content = content.replace('            updateDisplay();\n      initReviews();', '            updateDisplay();')
content = content.replace('        updateDisplay();\n      initReviews();', '        updateDisplay();')
content = content.replace('          updateDisplay();\n      initReviews();', '          updateDisplay();')

with open('store/index.html', 'w') as f:
    f.write(content)

with open('store/index.html', 'r') as f:
    content = f.read()

content = content.replace('      .review-stars {\n        color: var(--primary-color);\n        margin-bottom: 1rem;\n      }', '      .review-stars {\n        color: var(--primary-color);\n        margin-bottom: 0.5rem;\n      }')

with open('store/index.html', 'w') as f:
    f.write(content)

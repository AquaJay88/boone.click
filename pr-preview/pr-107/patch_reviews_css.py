with open('store/index.html', 'r') as f:
    content = f.read()

css_rules = """
    .review-dot {
      width: 10px;
      height: 10px;
      background-color: var(--border-color);
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .review-dot.active {
      background-color: var(--primary-color);
    }
    .review-message {
      font-size: 1.1rem;
      color: var(--text-primary);
      margin-bottom: 1rem;
      font-style: italic;
    }
    .review-author {
      font-weight: bold;
      color: var(--text-primary);
    }
    .review-product {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }
    .review-stars {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
"""

content = content.replace('  </style>\n</head>', css_rules + '  </style>\n</head>')

with open('store/index.html', 'w') as f:
    f.write(content)

#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Download Portuguese SpaCy model
python -m spacy download pt_core_news_sm

echo "Setup complete!"

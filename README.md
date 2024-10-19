# Travel Vibe

**Travel Vibe** is a dynamic travel website that allows users to explore various travel plans, make bookings, and interact with a Rasa-powered AI chatbot to receive travel plan recommendations based on user preferences. The website is developed using modern web technologies and is containerized with Docker for easy deployment and scalability.

## Table of Contents
- [Technologies](#technologies)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)

## Technologies

- **Frontend**: React
- **Backend**: Python (FastAPI)
- **AI Chatbot**: Rasa
- **Database**: MongoDB (hosted on a cluster)
- **Containerization**: Docker

## Features

1. **Login Page**: Secure authentication for users to log in and access their travel plans and orders.
2. **Home Page**: Introduction to Travel Vibe, featuring popular travel plans.
3. **Travel Plans Page**: Explore and filter through curated travel plans, with detailed descriptions and booking options.
4. **About Us Page**: Learn more about Travel Vibe and the team behind it.
5. **Order Page**: Review selected travel plans, update order preferences, and proceed to checkout.
6. **Checkout Page**: Finalize your travel booking and confirm your order.
7. **Rasa AI Chatbot**: Get travel recommendations tailored to your requirements via the integrated chatbot.

## Project Structure
Travel-Vibe/ │

├── frontend/ # React frontend │ 

├── public/ # Static files and assets │ 

├── src/ │ 

├── components/ # Reusable components │ 

├── pages/ # Login, Home, Travel Plans, etc. 

│  └── App.js # Main app component 

│  ├── backend/ # Python FastAPI backend 

│  ├── app/ # FastAPI app with routes and logic 

│  └── Dockerfile # Docker configuration for backend 

│  ├── rasa/ # Rasa AI chatbot 

│  ├── actions/ # Custom actions for chatbot 

│  ├── data/ # Training data for chatbot 

│  ├── models/ # Rasa model files 

│  ├── domain.yml # Rasa domain configuration 

│  └── Dockerfile # Docker configuration for Rasa 

│  ├── mongo/ # MongoDB database hosted on a cluster 

├── docker-compose.yml # Docker Compose file for multi-container setup 

└── README.md # This README file


## Installation

### Prerequisites
- **Node.js** (for React frontend)
- **Python** (for FastAPI backend and Rasa chatbot)
- **Docker** (for containerization)
- **MongoDB** (for database, hosted on a cluster)

### Clone the Repository
```bash
git clone https://github.com/your-username/travel-vibe.git
cd travel-vibe
```

## Usage

### Backend Setup

- Navigate to the backend directory and set up the FastAPI server:
```bash
cd backend
# Install dependencies
pip install -r requirements.txt
# Run FastAPI server
uvicorn app.main:app --reload
```

## Rasa Chatbot Setup

- Navigate to the Rasa directory to start the chatbot server:
```bash
cd rasa
# Install Rasa dependencies
pip install rasa
# Train the Rasa model
rasa train
# Start the Rasa action server
rasa run actions
# Start Rasa chatbot server
 rasa run --enable-api --cors "*"
```

## Frontend Setup

- Navigate to the frontend directory and start the React app:
```bash
cd frontend
# Install dependencies
npm install
# Start the React development server
npm start
```

## Docker Setup

-To run the entire project using Docker, ensure Docker is installed and run the following command in the root directory:
```bash
docker-compose up --build
```

## This will spin up:

- **Frontend**: React app at http://localhost:3000
- **Backend**: FastAPI server at http://localhost:8000
- **AI Chatbot**: AI chatbot at http://localhost:5005
- **MongoDB**: MongoDB database running in the background
  

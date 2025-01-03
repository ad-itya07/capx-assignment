# Backend - Portfolio Tracker

This folder contains the backend code for the Portfolio Tracker application. It is built using Node.js, Express.js, MongoDB, and Yahoo Finance API for fetching stock prices.

---

## Steps to Run the Backend Locally


 1. **Clone the Repository** :
git clone https://github.com/Jahnavi-Undavalli/capx_backend

 2. **Install Dependencies**:
npm install

 3. **Set Up Environment Variables**:
       ## Create a .env file in the backend folder with the following content:
            MONGO_URI=mongodb+srv://undavallijahnavi354:XzAcLnKpp46zNoSr@cluster0.0ziny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

 4. **Test API Endpoints** :
       ## Use the following URL to get all the stocks:
            https://capx-backend-bbv8.onrender.com/api/stocks

## Assumptions and Limitations :
 1. **Yahoo Finance Integration**:
   Yahoo Finance is used to fetch live stock prices.
   If a ticker is invalid or incorrect, an error message "Invalid or incorrect stock ticker" is returned.

 2. **Error Handling**:
   In case of API failure or other issues, the application gracefully handles errors and continues functioning for other valid tickers.

 3. **Local MongoDB Setup**:
   Ensure MongoDB is installed locally or use a cloud-hosted MongoDB instance (e.g., MongoDB Atlas).

## Links:
# Deployed Link:
https://github.com/Jahnavi-Undavalli/capx_backend

# Live Link:
https://capx-backend-bbv8.onrender.com/api/stocks


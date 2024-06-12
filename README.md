# C2 Project

## Table of Contents
1. [Introduction](#introduction)
2. [Mission and Vision](#mission-and-vision)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Project](#running-the-project)
7. [Testing](#testing)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction
C2 is a dynamic digital platform designed to foster innovation and collaboration. It allows a diverse community of entrepreneurs, innovators, students, and professionals to share, develop, and launch ideas directly on the platform. C2 acts as a melting pot for innovative concepts, transforming them into tangible projects and products.

## Mission and Vision
Our mission is to revolutionize how ideas reach the market by providing the necessary resources, support, and community engagement to turn visionary concepts into reality. Our vision is to create a global ecosystem where innovation thrives and collaborative efforts lead to sustainable and impactful solutions.

## Technologies Used
- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Blockchain**: Custom implementation
- **Testing**: Jest
- **Deployment**: Docker, GitHub Actions

## Installation

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn (v1.x or later)
- MongoDB
- Docker (for deployment)

### Backend Installation
1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

### Frontend Installation
1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

## Configuration

### Backend Configuration
1. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```plaintext
    PORT=5000
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

### Frontend Configuration
1. Create a `.env` file in the `frontend` directory and add the following environment variables:
    ```plaintext
    REACT_APP_API_URL=http://localhost:5000/api
    ```

## Running the Project

### Running Backend
1. Start the backend server:
    ```sh
    npm run dev
    ```

### Running Frontend
1. Start the frontend development server:
    ```sh
    npm start
    ```

## Testing

### Running Tests
1. To run backend tests, navigate to the `backend` directory and run:
    ```sh
    npm test
    ```

2. To run frontend tests, navigate to the `frontend` directory and run:
    ```sh
    npm test
    ```

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature-branch`)
6. Open a pull request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

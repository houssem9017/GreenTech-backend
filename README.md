# GreenTech-backend

## Description

GreenTech-backend is a Node.js server application developed as part of a three-month internship at GreenTech, Germany in summer 2023. This application is designed to manage eco-friendly packaging solutions, focusing on sustainability and environmental friendliness. It offers a suite of RESTful API endpoints for robust user authentication and package management, utilizing technologies such as Express, MongoDB, and JWT to ensure secure and efficient operations.


## Getting Started

### Dependencies

- Node.js
- MongoDB
- Express
- Mongoose
- dotenv
- CORS
- cookie-parser
- morgan

### Installing

1. Clone the repository:
```bash
git clone https://github.com/yourusername/GreenTech-backend.git
```
3. Navigate to the project directory:
```bash
cd GreenTech-backend
```
3. Install the dependencies:
```bash
npm install
```
4. Create a `.env` file in the root directory with the following contents:
PORT=3000
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret


### Running the Application

Start the server with:
```bash
npm start
```

## API Endpoints

### Package Routes

- **Create a Package**
  - `POST /package/create`
  - Creates a new package.

- **Add Category Data to a Package**
  - `POST /package/addcategorydata`
  - Adds category data to an existing package.

- **Get Package by ID**
  - `GET /package/getpackagebyid/:packageId`
  - Retrieves a package by its ID.

- **Get Packages by Category**
  - `GET /package/getpackagebycategory/:category`
  - Fetches packages based on their category.

- **Get Packages by Filters**
  - `POST /package/getpackagebyfilters`
  - Retrieves packages based on various filters.

- **Delete a Package**
  - `POST /package/deletepackage`
  - Deletes a package. Requires user verification.

### User Routes

- **User Registration**
  - `POST /user/signup`
  - Registers a new user.

- **User Login**
  - `POST /user/login`
  - Authenticates a user and provides a session token.

- **Get Cookies**
  - `GET /user/getcookies`
  - A test route to retrieve cookies.

## Contributing

Contributions make the open-source community thrive. We welcome your contributions:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

Houssem Darragi – [houssem.darragi@esprit.tn](mailto:houssem.darragi@esprit.tn)

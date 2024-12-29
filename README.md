# Lost-n-Found System

A web-based lost and found management system that helps users report lost items and claim found items efficiently.

## Project Structure

```
Lost-n-Found/
├── backend/             # Backend server files
├── frontend/           # React frontend application
└── Upload Files/       # Storage for uploaded item images
```

## Features

- User-friendly interface for reporting lost items
- Item claiming system
- Image upload functionality
- Search and filter capabilities
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Material-UI components
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB for database
- Multer for file uploads

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Core Functions and Features

### Item Management Functions

#### `createItem(itemData)`
- Purpose: Creates a new lost/found item entry
- Parameters: 
  - `itemData`: Object containing item details (name, description, category, location, date, image)
- Returns: Created item object with unique ID

#### `searchItems(filters)`
- Purpose: Searches items based on given filters
- Parameters:
  - `filters`: Object containing search criteria (category, date range, keywords)
- Returns: Array of matching items

#### `updateItemStatus(itemId, status)`
- Purpose: Updates the status of an item (lost, found, claimed)
- Parameters:
  - `itemId`: Unique identifier of the item
  - `status`: New status to be set

### Claim Management Functions

#### `submitClaim(claimData)`
- Purpose: Submits a new claim for a found item
- Parameters:
  - `claimData`: Object containing claim details (itemId, claimantInfo, proofDetails)
- Returns: Claim submission status

#### `validateClaim(claimId)`
- Purpose: Validates a claim against item details
- Parameters:
  - `claimId`: Unique identifier of the claim
- Returns: Validation result

### File Management Functions

#### `uploadImage(file)`
- Purpose: Handles image upload for items
- Parameters:
  - `file`: Image file object
- Returns: URL of uploaded image

#### `validateFileType(file)`
- Purpose: Validates uploaded file types
- Parameters:
  - `file`: File object to validate
- Returns: Boolean indicating if file type is valid

### Authentication Functions

#### `authenticateUser(credentials)`
- Purpose: Authenticates user login
- Parameters:
  - `credentials`: Object containing username and password
- Returns: Authentication token

#### `validateToken(token)`
- Purpose: Validates user session token
- Parameters:
  - `token`: JWT token
- Returns: Boolean indicating if token is valid

### Utility Functions

#### `formatDate(date)`
- Purpose: Formats dates consistently across the application
- Parameters:
  - `date`: Date object or string
- Returns: Formatted date string

#### `validateInput(data, schema)`
- Purpose: Validates user input against defined schemas
- Parameters:
  - `data`: Input data to validate
  - `schema`: Validation schema
- Returns: Validation result object

## Main Components

### Item Management
- **ItemForm**: Component for submitting lost/found items
- **Item Display**: Grid view of all reported items
- **Search Functionality**: Filter items by category, date, or description

### User Interface
- **Navbar**: Navigation component with links to different sections
- **Claim System**: Process for users to claim found items
- **Image Upload**: Support for uploading item images

## API Endpoints

### Items
- `POST /api/items` - Create new item
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get specific item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Claims
- `POST /api/claims` - Submit a claim
- `GET /api/claims` - Get all claims
- `PUT /api/claims/:id` - Update claim status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

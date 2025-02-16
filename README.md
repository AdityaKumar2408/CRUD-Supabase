# CRUD-Superbase

![image](https://github.com/user-attachments/assets/6d4a2dc8-dbcc-4f0b-8ae1-7058cc93e172)

## 📝 Description

This is a **CRUD-Superbase** built with a **React frontend** and an **Express.js backend**. It allows you to perform CRUD (Create, Read, Update, Delete) operations on users, including uploading and managing profile images. The project uses **Supabase** for database and file storage, making it a modern and scalable solution.

Key Features:
- Add new users with profile images.
- Edit existing user details and images.
- Delete users and their associated profile images.
- View a list of all users with their details and images.
- Responsive and user-friendly UI.

---

## 🛠️ Technologies Used

### Frontend
- **React** - JavaScript library for building the user interface.
- **Axios** - For making HTTP requests to the backend.
- **CSS** - For styling the components.

### Backend
- **Express.js** - Node.js framework for building the REST API.
- **Multer** - For handling file uploads.
- **Supabase** - For database and file storage.

### Database & Storage
- **Supabase PostgreSQL** - For storing user data.
- **Supabase Storage** - For storing user profile images.

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- A Supabase account (for database and storage).

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/user-management-system.git
   cd user-management-system
   ```

2. **Set Up the Backend**
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` folder and add your Supabase credentials:
     ```env
     SUPABASE_URL=your-supabase-url
     SUPABASE_KEY=your-supabase-key
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Set Up the Frontend**
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

4. **Access the Application**
   - Open your browser and go to `http://localhost:5173/`.

---

## 🎨 Features

### 1. **Add a New User**
   - Fill in the form with the user's name, email, mobile, address, and profile image.
   - Click the "Add User" button to save the user.

### 2. **Edit a User**
   - Click the "Edit" button on any user card.
   - The form will be populated with the user's details.
   - Make changes and click "Update User" to save.

### 3. **Delete a User**
   - Click the "Delete" button on any user card.
   - Confirm the deletion, and the user will be removed from the list.

### 4. **View User List**
   - All users are displayed in a grid layout with their details and profile images.

---

## 📂 Project Structure

```
user-management-system/
├── backend/
│   ├── server.js          # Backend server code
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── index.js       # React entry point
│   │   └── styles.css     # CSS for the frontend
│   ├── package.json       # Frontend dependencies
│   └── public/            # Static assets
└── README.md              # Project documentation
```

---

## 🌐 API Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | `/users`          | Fetch all users with their details.  |
| POST   | `/users`          | Add a new user.                      |
| PUT    | `/users/:id`      | Update an existing user.             |
| DELETE | `/users/:id`      | Delete a user and their image.       |

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Supabase](https://supabase.io) for providing an excellent backend-as-a-service.
- [React](https://reactjs.org) and [Express.js](https://expressjs.com) for making development easier.

---

## 📧 Contact

If you have any questions or feedback, feel free to reach out:

- **Your Name** - [adityachouhan7705@gmail.com](mailto:adityachouhan7705@gmail.com)
- **GitHub** - [AdityaKumar2408](https://github.com/AdityaKumar2408)

---

Enjoy using the CRUD-Superbase! 🎉

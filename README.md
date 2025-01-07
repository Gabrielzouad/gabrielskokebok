# Gabriels Kokebok

Gabriels Kokebok is a recipe application that combines a **Next.js** frontend with a **Sanity Studio** backend. The app allows users to create, manage, and showcase recipes, providing an elegant and user-friendly interface for both desktop and mobile devices.

---

## **Project Structure**

The project is divided into two main parts:

### **1. Frontend**
- **Framework**: Next.js
- **Directory**: `web`
- **Purpose**: Manages the user-facing interface for browsing and reading recipes.
- **Key Features**:
  - Responsive design for desktop and mobile.
  - Dynamic routing using the Next.js App Directory.
  - Optimized performance and SEO capabilities.

### **2. Backend**
- **Platform**: Sanity Studio
- **Directory**: `studio`
- **Purpose**: Acts as the CMS (Content Management System) for managing recipe content.
- **Key Features**:
  - Flexible schema definitions for recipes.
  - Simple integration with the frontend for data fetching.

---

## **Folder Structure**
```
project-root/
├── studio/               # Sanity Studio backend
│   ├── schemas/          # Sanity schemas for recipes
│   ├── sanity.config.ts  # Sanity configuration file
│   └── package.json
├── web/                  # Next.js frontend
│   ├── app/              # Application code
│   ├── public/           # Static assets
│   ├── styles/           # CSS/SCSS files
│   ├── next.config.js    # Next.js configuration
│   └── package.json
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
└── (other files)
```

---

## **Getting Started**

### **Prerequisites**
Make sure you have the following installed:
- Node.js (LTS recommended)
- npm or yarn
- Git

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. Install dependencies for both `web` and `studio`:
   ```bash
   cd studio
   npm install
   cd ../web
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both `studio` and `web` directories.
   - Add necessary keys (e.g., API keys, database URLs).

### **Run the Project**
- **Start Sanity Studio**:
  ```bash
  cd studio
  npm run dev
  ```
- **Start Next.js App**:
  ```bash
  cd ../web
  npm run dev
  ```

Access the frontend at `http://localhost:3000` and the studio at `http://localhost:3333`.

---

## **Deployment**

### **Frontend**
1. Build the Next.js app:
   ```bash
   cd web
   npm run build
   ```
2. Deploy to a hosting service (e.g., Vercel, Netlify).

### **Backend**
1. Deploy Sanity Studio using Sanity's deployment tools:
   ```bash
   cd studio
   npm run deploy
   ```

---

## **Technologies Used**

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Sanity CMS
- **Version Control**: Git and GitHub

---

## **Future Enhancements**

- Integration with a recipe API for preloaded content.
- User authentication for personalized recipe management.
- Mobile app version using React Native.

---

## **Contributing**

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


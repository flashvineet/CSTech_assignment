# Agent Distribution (MERN) —

A MERN application that lets an admin log in, create/manage agents, upload a CSV/XLS/XLSX of leads, and automatically distribute them equally among up to 5 agents. Displays distribution results per-agent and dashboard stats.

# Tech Stack

- Backend: Node.js, Express.js, MongoDB (Mongoose), JWT
- Frontend: React


# Backend — Setup & Run

1. Install
   cd backend
   npm install
  

2. Start
   bash
   npm run dev 
   You should see:
   MongoDB connected
   Server running on port 5000



# Frontend — Setup & Run

1. Install
   cd ../frontend
   npm install

2. Start
   npm run dev
   Open the app in your browser (usually `http://localhost:5173` )

4. **Login**
   - Email: `admin@example.com`
   - Password: `secret123`

5. **Navigate**
   - Dashboard → shows Total Agents, Total Uploads(files), Total Records (leads)
   - Agents → list/create/delete agents
   - Upload → pick CSV/XLSX and submit to view per-agent distribution tables





Video demonstration (Google Drive): <YOUR_LINK_HERE>

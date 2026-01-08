## 🚀 Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd movie-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add the following variables:
    `env
   MONGO_URI=mongodb+srv://Movie_booking:jYM8faaHG20EbxKe@cluster0.47olkeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

    PORT=3000

CLERK_PUBLISHABLE_KEY=pk_test_bWVldC1oYWxpYnV0LTMxLmNsZXJrLmFjY291bnRzLmRldiQ

CLERK_SECRET_KEY=sk_test_7o2qDOn4Eoa7vH1Hj2Xo3aJ8b9650K2659p4829672

TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.
eyJhdWQiOiIxMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMSIsIm5iZiI6MTY4MjkyOTQ2MS4wNTg4MjQsInN1YiI6IjY0NGY2MzdjZWY4YjMyMDNiODA4ZjkzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h-XjfGabswzlC3Uukt-3l6U1UU2vjv3EBwFrxrWsYGI

JWT_SECRET=b35b49fc9e6bc25e88df4fec75eaa6aaf0b1fdf170142e09040a568ed46f6d8d109dd9a9d4fc33c38fae3c18dd5ed9a5ba2516c9e874ea2d48914d17040ac6f70
    `

4.  **Run the Server:**
    - For development (with nodemon):
      ```bash
      npm run dev
      ```
    - For production:
      ```bash
      npm start
      ```

The local server will start at `http://localhost:3000`.
Server URL `https://movie-backend-production-3d6a.up.railway.app/`

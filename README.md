# AboAI – Chat Console

AboAI is a modern, scalable, and performant chat console built using **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. The application is structured with modular architecture, optimized for scalability and maintainability. It is deployed using **AWS Amplify**, leveraging cloud-native capabilities for hosting, authentication, and more.

## 🚀 Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [AWS Amplify](https://docs.amplify.aws/)

---

## Project Structure

```plaintext
harvey-chat-console/
├── dist/                   # Build output
├── node_modules/           # Dependencies
├── public/                 # Static public assets
├── src/                    # Main application source code
│   ├── assets/             # Images and static resources
│   ├── components/         # Reusable React components
│   ├── config/             # Configuration files and constants
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and utility services
│   ├── store/              # Global state management (e.g., Redux or Zustand)
│   ├── styles/             # Global and component-specific styles
│   ├── types/              # TypeScript type definitions
│   ├── views/              # Page-level components and views
│   ├── App.tsx            # Root React component
│   ├── aws-exports.ts     # AWS Amplify configuration
│   ├── index.css          # Global CSS imports
│   ├── main.tsx           # Vite entry point
│   └── vite-env.d.ts      # Vite environment types
├── .env                    # Environment variables
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Git ignore rules
├── .prettierrc             # Prettier formatting rules
├── .prettierignore         # Prettier ignore rules
├── index.html              # Main HTML file
├── email.html              # Email template (if used)
├── package.json            # Project metadata and scripts
└── README.md               # Project documentation (you are here)
````

---

## Setup & Development

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/aboai-chat-console.git
cd aboai-chat-console
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file and add necessary environment variables. Example:

```env
VITE_API_URL=https://api.example.com
```

### 4. Run the App Locally

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

---

## ☁️ Deployment (AWS Amplify)

This project is configured to be deployed using AWS Amplify:

* Ensure `aws-exports.ts` is generated and configured via `amplify init` and `amplify push`.
* The app can be deployed by connecting the repository to AWS Amplify Console.

For detailed documentation, see [AWS Amplify Hosting Guide](https://docs.amplify.aws/hosting/).

---

## Linting & Formatting

* **ESLint**: Run `npm run lint` to check for linting issues.
* **Prettier**: Pre-configured with `.prettierrc` for consistent formatting.

---

## Contributing

Feel free to fork the repository and submit pull requests. All contributions, issues, and feature requests are welcome!

---

## License

This project is licensed under the MIT License.

---

## Contact

For more information, contact the AboAI team or open an issue on the repository.

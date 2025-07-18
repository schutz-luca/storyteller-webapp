<h1 align="center">Storyteller Webapp</h1>

**Storyteller Webapp** is an interactive web application used to generate AI based narratives creatively and collaboratively. The app was coded with **[React](https://react.dev/)** and generated with **[Vite](https://vite.dev/)**.

## 🚀 Technical Features
- English and portuguese translations with **[i18n](https://www.i18next.com/)**
- Real-time webhooks architecture with **[Fluid Framework](https://fluidframework.com/)**
- Centralized global states with **[Context API](https://react.dev/reference/react/createContext)**
- Animated transitions with **[Framer Motion](https://motion.dev/)**
- Styled animations with **[Lottie](https://lottiefiles.com/)**

## 🛠️ Installation and Setup

Follow the steps below to set up the project locally:

### 1. Prerequisites
Before starting, make sure you have the following installed/created:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Fluid Framework](https://fluidframework.com/) instance running on [Azure Fluid Relay](https://azure.microsoft.com/en-us/products/fluid-relay)

### 2. Clone the Repository
Clone this repository to your local machine using:

```bash
git clone https://github.com/schutz-luca/storyteller-webapp.git
```

### 3. Navigate to the project folder
Move into the project's directory:

```bash
cd storyteller-webapp
```

### 4. Install dependencies
Install all required dependencies for the project.

```bash
npm install
```

or

```bash
yarn
```

### 5. Create environment file
Create a `.env` file in the root directory of the project and configure the required variables. Use the provided `.env.example` file as a reference:

```bash
cp .env.example .env
```

### 6. Start the development server
Run the development server to start the application.

```bash
npm run dev
```

or

```bash
yarn dev
```

### 7. Run the API
To run it properly, you'll also need to run the Storyteller API, but for security reasons, it's **currently private**. Please email lucaschutzenhofer@hotmail.com if you're interested in running the API.

## 📄 License

The MIT License (MIT)
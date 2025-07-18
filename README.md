<h1 align="center">Storyteller Webapp</h1>

<p align="center">
<b>Storyteller Webapp</b> is an interactive web application used to create AI based narratives creatively and collaboratively. The app was coded with <b>React.js</b> and generated with <b>Vite</b>.
<br></br>
<img src="./src/assets/banner.png" style="border-radius: 10px"/>
<p/>


## 🚀 Technical Features
- English and portuguese translations with **i18n**
- Real-time webhooks architecture with **Fluid Framework**
- Centralized global states with **Context API**
- Animated transitions with **Framer Motion**
- Styled animations with **Lottie**

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

### 3. Navigate to the Project Folder
Move into the project's directory:

```bash
cd storyteller-webapp
```

### 4. Install Dependenciese
Install all required dependencies for the project.

```bash
npm install
```

or

```bash
yarn
```

### 5. Install Dependencies
Create a `.env` file in the root directory of the project and configure the necessary variables. Use the provided `.env.example` file as a reference:

```bash
cp .env.example .env
```

### 6. Start the Development Server
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
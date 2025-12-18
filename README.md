# Solar Tools Suite ☀️

A unified web application designed to streamline operations for solar energy businesses. This suite combines a **Quotation Generator** and an **Agreements Generator** into a single, cohesive platform, enabling professionals to create detailed cost estimates and legal documents efficiently.

## 🚀 Features

### 1. Quotation Generator 💰
*   **Cost Breakdown**: Detailed calculation of structure, wiring, and other installation costs.
*   **Project Details**: Input for monthly/annual electricity bills and recommended system size (kWp).
*   **ROI Calculation**: Automatic calculation of Return on Investment and savings.
*   **PDF Export**: Generates a professional PDF quotation with:
    *   Company branding (SolarFlow).
    *   Customer details.
    *   Financial breakdown including GST.
    *   Solar benefits and company information.

### 2. Agreements Generator 📝
*   **Vendor Agreement**:
    *   Auto-fills vendor and consumer details.
    *   Standardized legal template for PM Surya Ghar: Muft Bijli Yojana.
    *   Preserves exact layout and formatting of official documents.
*   **Net Metering Agreement**:
    *   Handles USC numbers and grid connection details.
    *   Multi-page PDF generation compliant with utility standards.

## 🛠️ Tech Stack

*   **Frontend Framework**: [React.js](https://react.dev/) (v18)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Routing**: [React Router DOM](https://reactrouter.com/)
*   **PDF Generation**:
    *   `jspdf`: For creating PDF documents programmatically.
    *   `jspdf-autotable`: For table generation within PDFs.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
*   **Forms**: [React Hook Form](https://react-hook-form.com/)

## 📂 Project Structure

```
solar-tools-suite/
├── src/
│   ├── assets/          # Images and static resources
│   ├── components/      # Reusable UI components
│   │   ├── agreements/  # Components specific to Agreements Generator
│   │   └── quotation/   # Components specific to Quotation Generator
│   ├── pages/           # Main page views (Home, Quotation, Agreements)
│   ├── utils/           # Helper functions (PDF generation logic)
│   ├── App.jsx          # Main application component with Routing
│   └── main.jsx         # Entry point
├── public/              # Public static assets
└── package.json         # Project dependencies and scripts
```

## 🏁 Getting Started

Follow these steps to set up the project locally:

1.  **Clone the repository** (if applicable) or download the source code.

2.  **Install Dependencies**:
    Navigate to the project root directory and run:
    ```bash
    npm install
    ```

3.  **Run the Development Server**:
    Start the local server with:
    ```bash
    npm run dev
    ```

4.  **Access the App**:
    Open your browser and go to `http://localhost:5173`.

## 📜 Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the app for production.
*   `npm run preview`: Locally preview the production build.
*   `npm run lint`: Runs ESLint to check for code quality issues.

## 📄 License

This project is created for hackathon purposes.

# Dev Cookbook - JWT Tools

A collection of useful developer tools, starting with a JWT encoder and decoder.

## Live Demo

Visit the live application at: https://[your-github-username].github.io/dev-cookbook/

## Features

- Create and parse JWT tokens
- Choose from multiple hashing algorithms (HS256, HS384, HS512)
- Create signed JWTs using a secret key
- Real-time token decoding
- Modern, responsive UI inspired by jwt.io

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dev-cookbook
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment

This project is configured for deployment to GitHub Pages. To deploy:

1. Create a new GitHub repository
2. Push your code to the repository
3. Enable GitHub Pages in your repository settings
4. The site will be automatically deployed when you push to the main branch

### Manual Deployment

To manually deploy to GitHub Pages:

```bash
npm run deploy
```

## Usage

### Encoding a JWT

1. Switch to the "Encode" tab
2. Enter your JWT header (default is provided)
3. Enter your JWT payload
4. Enter your secret key
5. Select the desired algorithm
6. Click "Encode" to generate the JWT

### Decoding a JWT

1. Switch to the "Decode" tab
2. Paste your JWT token
3. Click "Decode" to view the decoded payload

## Technologies Used

- React
- TypeScript
- Vite
- Chakra UI
- jose (JWT library)
- GitHub Pages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
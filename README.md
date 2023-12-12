# RideSync

## Quick start

Follow these steps to set up and run the project on your local machine.

Clone the repository

```bash
git clone git@github.com:iambasantarai/ride-sync-api.git
```

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org)
- [ngrok](https://ngrok.com/)

### API Setup

- Navigate to the project directory

```bash
cd ride-sync-api
```

- Copy the `.env.example` to `.env`

```bash
cp .env.example .env
```

Update the configuration values in the `.env` file with your preferred settings.

- Install dependencies

  ```bash
  yarn install
  ```

- Start development server

  ```bash
  yarn dev
  ```

### NOTE

For seamless integration of this API with your React Native app, ensure your local port is accessible by employing [ngrok](https://ngrok.com/) to expose it.

```bash
ngrok http PORT
```

Replace `PORT` with the actual port where your API is exposed. Once executed, you'll receive a forwarding link (e.g., `https://fbd1-2405-acc0-1304-4263-00-1.ngrok.io`). You'll need this link for integration with React Native app.

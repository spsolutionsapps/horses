# Horses & Humans Website

Documentary series website deployed on Vercel.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and add your Resend API key:
```bash
cp .env.example .env
```

3. Get your API key from https://resend.com and add it to `.env`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

4. Run locally:
```bash
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add `RESEND_API_KEY` environment variable in Vercel dashboard

## Features

- Contact form with Resend email integration
- Responsive design
- Custom fonts: Noto Serif Display & Work Sans
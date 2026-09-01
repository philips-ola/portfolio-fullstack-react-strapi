# Philips Ola Portfolio

A full-stack portfolio and blog application built with a React frontend and a Strapi headless CMS backend. The site serves as a professional digital portfolio for showcasing projects, writing, and contact information.

Live site: https://philipsola.vercel.app

## Overview

This repository contains two main applications:

- Frontend: a React + React Router + TypeScript app for the public portfolio experience
- Backend: a Strapi CMS instance for managing projects, blog posts, media, and admin content

The frontend consumes data from the Strapi API and renders polished pages for:

- Home landing page
- About page
- Projects showcase and detailed project pages
- Blog list and article detail pages
- Contact page with Formspree integration

## Live Demo

- Production URL: https://philipsola.vercel.app

## Tech Stack

### Frontend

- React 19
- React Router 7
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- React Markdown

### Backend

- Strapi 5
- PostgreSQL / SQLite-ready database configuration
- Cloudinary media upload integration
- Admin authentication and content management APIs

### Deployment

- Frontend: Vercel
- Backend: Render or any Strapi-compatible hosting provider

## Project Structure

```bash
portfolio-fullstack-react-strapi/
├── README.md
├── screenshots/
│   ├── about-me.png
│   ├── contact.png
│   ├── landing-page.png
│   ├── post-page.png
│   ├── projects.png
│   ├── single-post.png
│   └── single-project.png
├── react-portfolio-frontend/
│   ├── app/
│   ├── public/
│   ├── build/
│   ├── docs/
│   ├── package.json
│   ├── vite.config.ts
│   ├── react-router.config.ts
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── README.md
└── react-portfolio-backend/
    ├── config/
    ├── database/
    ├── public/
    ├── src/
    ├── types/
    ├── package.json
    ├── tsconfig.json
    ├── README.md
    └── .env.example
```

## Frontend Details

The frontend app is located in `react-portfolio-frontend` and is built as a modern portfolio website using React Router.

### Main Features

- Responsive homepage with hero section and call-to-action buttons
- Featured work cards and project highlights
- Full project archive with filtering and detail pages
- Blog listing with content pulled from Strapi
- Dynamic markdown rendering for blog posts
- Contact form connected to Formspree
- SEO metadata and page-level route structure

### Frontend Route Structure

The app uses React Router configuration to render the following routes:

- `/` - Home page
- `/about` - About section
- `/projects` - All projects
- `/projects/:id` - Individual project detail page
- `/blog` - Blog posts list
- `/blog/:slug` - Individual article page
- `/contact` - Contact form page

### Frontend API Integration

The frontend reads data from Strapi using `fetch` requests to endpoints like:

```ts
VITE_STRAPI_URL/api/projects
VITE_STRAPI_URL/api/posts
```

It supports content population for media, images, and rich text fields. Typical queries include:

```bash
/api/projects?populate=*
/api/posts?populate=image&sort=date:desc
/api/posts?filters[slug][$eq]=slug&populate=image
```

### Frontend Environment Variables

Create a `.env` file in `react-portfolio-frontend`:

```bash
VITE_STRAPI_URL=http://localhost:1337
```

For production, set it to your hosted Strapi backend URL.

### Frontend Local Development

From `react-portfolio-frontend`:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run start
```

### Frontend Deployment

The app is configured for deployment on Vercel with a standard React Router build process. Make sure the backend URL is set using a Vercel environment variable.

## Backend Details

The CMS backend is located in `react-portfolio-backend` and is powered by Strapi.

### Backend Responsibilities

- Manage portfolio projects and blog posts
- Store article content, metadata, and images
- Serve REST APIs to the frontend
- Handle media uploads through Cloudinary
- Provide admin panel access for content updates

### Backend Stack

- Strapi v5
- PostgreSQL-ready database configuration
- Cloudinary upload provider
- Users & permissions plugin

### Backend Configuration Highlights

The backend includes custom config for:

- database connection settings
- admin JWT and tokens
- media upload integration with Cloudinary
- server app keys

Key config files:

- `react-portfolio-backend/config/database.ts`
- `react-portfolio-backend/config/plugins.ts`
- `react-portfolio-backend/config/server.ts`
- `react-portfolio-backend/config/admin.ts`

### Strapi Database Setup

The project supports SQLite for local development and PostgreSQL for production-like deployment. A typical Postgres configuration uses environment variables such as:

```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=react-portfolio
DATABASE_USERNAME=your_user
DATABASE_PASSWORD=your_password
DATABASE_URL=your_connection_string
```

### Cloudinary Media Integration

The backend uses the Cloudinary provider for uploading and storing images/media. Environment variables include:

```bash
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret
```

### Backend Environment Variables

Use the `.env` file in `react-portfolio-backend` with values such as:

```bash
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
DATABASE_CLIENT=postgres
DATABASE_URL=postgresql://user:password@host:5432/dbname
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret
```

### Backend Local Development

From `react-portfolio-backend`:

```bash
npm install
npm run develop
```

For a production build:

```bash
npm run build
npm run start
```

### Strapi Admin

After starting the backend, access the Strapi admin panel from:

```bash
http://localhost:1337/admin
```

Use this dashboard to create and update:

- projects
- blog posts
- media assets
- page content

## Content Model Overview

The CMS is designed around portfolio content, with the following main content types generally supported:

- Projects
  - title
  - description
  - image
  - technologies
  - live URL
  - featured flag
- Posts
  - title
  - slug
  - excerpt
  - date
  - image
  - content body

## Features Summary

- Portfolio-focused modern UI
- Content management through Strapi
- Responsive design across devices
- Rich media support with Cloudinary
- Blog and project collections
- Contact form integration
- Clean developer experience with TypeScript and Vite

## Screenshots

### Landing Page

![Landing Page](./screenshots/landing-page.png)

### About Me

![About Me](./screenshots/about-me.png)

### Projects

![Projects](./screenshots/projects.png)

### Single Project

![Single Project](./screenshots/single-project.png)

### Blog Post List

![Post Page](./screenshots/post-page.png)

### Single Blog Post

![Single Post](./screenshots/single-post.png)

### Contact Page

![Contact Page](./screenshots/contact.png)

## Deployment Notes

### Frontend

The frontend is deployed on Vercel and fetches content from the Strapi backend through the `VITE_STRAPI_URL` environment variable.

### Backend

The backend should be deployed to a host that supports Node.js and PostgreSQL or SQLite-compatible storage. For production, configure your database and Cloudinary settings using environment variables.

## Development Workflow

1. Start the Strapi backend.
2. Create or update project and blog entries in the admin panel.
3. Start the React frontend.
4. Confirm the frontend displays live data from the API.
5. Deploy the backend and frontend separately, ensuring environment variables are correctly configured.

## Notes

- The frontend is tightly coupled to the Strapi API structure, so content model changes should be reflected in frontend data parsing.
- The project is built for portfolio use but is easily extendable for additional sections, CMS collections, or pages.
- Keep your `.env` files private and never commit sensitive values to version control.

## Author

Philips Ola

## Connect

- Portfolio: https://olaphilips.com.ng/
- Contact: https://philipsola.vercel.app/contact
- YouTube: https://youtube.com/idtechnol
- Linkdln: https://linkedin.com/in/olaphilips

# Post-Ai

Post-Ai is a full-stack website that empowers users to create AI-generated images and share their creativity with the community. Users can craft posts that showcase AI-generated images along with descriptions. Other users have the ability to explore these posts and engage in discussions through comments. The platform also boasts robust user authentication mechanisms, including email verification and Google authentication, to safeguard user access.

## Table of Contents

- Introduction
- Prerequisites
- Features
- Demo
- Installation
- Configuration
- Usage
- Technologies Used
- License
<!-- - Contributing -->

## Prerequisites

Before diving into Post-Ai, make sure your system is equipped with the following prerequisites:

- Node.js: You can download and install Node.js from [nodejs.org](https://nodejs.org/en).

- PostgreSQL: Ensure you have PostgreSQL installed and configured on your system. You can download it from [postgresql.org](https://www.postgresql.org/download/).

- OpenAI API Key: Acquire an OpenAI API key from the [OpenAI website](https://platform.openai.com/). Keep this key ready for integration.

- Cloudinary Account: Sign up for a Cloudinary account if you don't have one. Cloudinary will be used for image hosting and management. You can create an account at [cloudinary.com](https://cloudinary.com/).

- Cloudinary Configuration: After setting up your Cloudinary account, you'll need to obtain your Cloudinary credentials, including the cloud name, API key, and API secret.

- Nodemailer Email Account: To send email verification emails, you'll need an email account for sending emails using Nodemailer. You can use a free Gmail account or any other email service.

- Google Authentication Configuration: For Google authentication, set up the necessary credentials in your Google Developer Console. Find more information [here](https://developers.google.com/identity/sign-in/web/sign-in).

## Features

Post-Ai offers a range of features to enhance user experience and interaction:

- User Authentication: Users can register and log in to the platform using email or Google authentication, ensuring secure access to the site.

- Email Verification: To enhance security, the platform includes an email verification process for users who register with their email.

- Post Creation: Users can create and publish posts that showcase AI-generated images along with descriptions. The OpenAI API is integrated to generate images.

- Image Hosting and Management: Cloudinary is used for image hosting and management, allowing users to seamlessly upload and display images.

- Commenting: Engage in discussions and provide feedback by leaving comments on posts, fostering a sense of community.

- User Profiles: Users can view their own profiles and the profiles of others to see their posts and activity on the platform.

- Responsive Design: The platform is designed to be responsive, providing a seamless experience on various devices and screen sizes.

- Technological Stack: The project showcases the integration of several technologies, including Vue.js, Pinia, Express, Node.js, JWT authentication, Bcrypt.js for password hashing, Axios for API communication, PostgreSQL for data storage, and the OpenAI API for image generation.

## Demo

[There is no link to a live demo or a video walkthrough of this project for now but later i might add it in the future.]

## Installation

To set up Post-Ai on your local machine, follow these installation steps:

1. Clone the repository:

```bash
git clone https://github.com/yourusername/post-ai.git
```

2. Move to the project directory:

```bash
cd post-ai
```

3. Install server dependencies:

```bash
npm install
```

4. Navigate to the client directory:

```bash
cd client
```

5. Install client dependencies:

```bash
npm install
```

## Configuration

Before launching Post-Ai, ensure your environment variables are set up in the .env file as outlined above.

```
DATABASE_URL=your_postgres_database_url
SECRET_KEY=your_secret_key
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_gmail_email_address
EMAIL_PASS=your_gmail_password
```

Here's a brief explanation of each variable:

- `DATABASE_URL`: The URL for your PostgreSQL database.
- `JWT_SECRET_KEY`: A secret key used for JWT token generation and validation.
- `OPENAI_API_KEY`: Your OpenAI API key for image generation.
- `GOOGLE_CLIENT_ID`: Your Google OAuth2 client ID.
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Your Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
- `EMAIL_USER`: Your google email address (used for sending verification emails).
- `EMAIL_PASS`: The google password for the email address used for sending verification emails.

## Technologies Used

Post-Ai is built with the following technologies and libraries:

- Front-end: Vue.js, Pinia, Axios
- Back-end: Express, Node.js, PostgreSQL
- Authentication: JWT, Bcrypt.js
- Image Generation: OpenAI API
- Image Hosting and Management: Cloudinary

## License

This project is licensed under the MIT License. See the LICENSE file for the full text of the license and licensing details. Feel free to use, modify, and distribute the code as per the terms of the license.

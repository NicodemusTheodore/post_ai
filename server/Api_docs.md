## Endpoints

List of Available Endpoints:

- `POST /auth/login`
- `POST /auth/login-google`
- `POST /auth/register`
- `GET /auth/verify/:verificationCode`
- `GET /bookmarks`
- `POST /bookmarks/:postId`
- `PATCH /bookmarks/:postId`
- `POST /api/v1/openai`
- `GET /:username`
- `PATCH /updateImage`

### POST /auth/login

#### Description

- Login

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "string",
    "access_token": "string",
    "username": "string"
  }
  ```

#### POST /auth/login-google

#### Description

- Login Via Google

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "token": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "string",
    "data": {
      "email": "string",
      "password": "string"
    }
  }
  ```

#### POST /auth/register

#### Description

- Register

#### Request

- Headers
  ```json
  {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  ```
- Body
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "string"
  }
  ```

#### GET /auth/verify/:verificationCode

#### Description

- Verify User

#### Request

- Headers
  ```json
  {
    "params": {
      "verificationCode": "string"
    }
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "string"
  }
  ```

#### GET /bookmarks

#### Description

- Get all bookmarks

#### Request

- Headers
  ```json
  {
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "data": "array"
  }
  ```

#### POST /bookmarks

#### Description

- Add new bookmark

#### Request

- Headers
  ```json
  {
    "params": {
      "postId": "integer"
    },
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "string"
  }
  ```

#### PATCH /bookmarks/:postId

#### Description

- Edit bookmark

#### Request

- Headers
  ```json
  {
    "params": {
      "postId": "integer"
    },
    "id": "integer"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "message": "string"
  }
  ```

#### POST /api/v1/openai

#### Description

- Get image from open ai

#### Request

- Body

  ```json
  {
    "prompt": "string"
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "image": "string"
  }
  ```

#### GET /:username

#### Description

- Get user profile

#### Request

- Headers
  ```json
  {
    "params": {
      "username": "string"
    }
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "data": "object"
  }
  ```

#### PATCH /updateImage

#### Description

- Update user profile image

#### Request

- Headers
  ```json
  {
    "params": {
      "id": "integer"
    }
  }
  ```

#### Response

_200 - OK_

- Body

  ```json
  {
    "imageUrl": "string"
  }
  ```

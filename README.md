## Todo App API Documentation

This Todo App API was built using [NestJS](https://nestjs.com/) and integrated with [Supabase](https://supabase.com/). The API provides endpoints to manage todo items using Supabase's PostgreSQL backend.

---

## Repository

To use this API, clone the repository:

###### GitHub CLI:

```
gh repo clone ChongBao1128/todo-app
```

##### HTTPS:

```
git clone https://github.com/ChongBao1128/todo-app.git
```

---

## Installation

##### 1. Navigate to the project directory:

```
cd todo-app
```

##### 2. Install dependencies. Run:

```
pnpm i
```

##### Run server

```
pnpm run start
```

> [!Note]
> Highlight: The API will start locally (by default on http://localhost:3000).

---

## Environment Variables

Before running the application, create a .env file in the project root and add the following variables:

```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
PORT=3000
```

> [!Note]
> Highlight: Replace `your_supabase_url` and `your_supabase_service_key` with your actual Supabase project credentials.

---

## API Endpoints

##### 1. GET `/todos`

**Description:**  
Retrieves all todo items stored in the database.

**Example Response:**

```
[
  {
    "id": 1,
    "task": "Test Todo",
    "is_complete": false,
    "inserted_at": "2025-03-10T00:00:00.000Z"
  },
  {
    "id": 2,
    "task": "Another Todo",
    "is_complete": true,
    "inserted_at": "2025-03-11T00:00:00.000Z"
  }
]
```

##### 2. POST `/todos`

`Headers: Content-Type: application/json`

**Description:**
Creates a new todo item in the database.

**Example Request Body:**

```
{
  "task": "Test Todo",
  "is_complete": false,
  "inserted_at": "2025-03-10"
}
```

##### 3. PUT `/todos/:id`

`Headers: Content-Type: application/json`

**Description:**
Updates an existing todo item identified by its id.

**Example Request Body:**

```
{
  "id": 999,
  "task": "Updated Task",
  "is_complete": true,
  "inserted_at": "2025-03-10"
}
```

##### 4. DELETE `/todos/:id`

**Description:**
Deletes a single todo item with the specified id.

**Expected Response:**

```
{
  "id": 999,
  "task": "Updated Task",
  "is_complete": true,
  "inserted_at": "2025-03-10T00:00:00.000Z"
}
```

> [!Note]
> Highlight: This response shows the details of the deleted todo item.

##### 5. DELETE `/todos`

**Description:**
Deletes all todo items from the database.

**Expected Response:**
`[]`

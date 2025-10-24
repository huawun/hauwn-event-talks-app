# Tech Talks Today

A simple web application to display a schedule of tech talks for a single-day event. Users can view the schedule and filter the talks by category.

## Features

- View a schedule of tech talks.
- Filter talks by category.
- Dynamically loaded content.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/huawun/hauwn-event-talks-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd hauwn-event-talks-app
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

1. Start the server:
   ```sh
   node server.js
   ```
2. Open your browser and navigate to `http://localhost:3001`.

## API Endpoints

### GET /api/talks

- **Description:** Retrieves the list of all tech talks.
- **Response:** A JSON array of talk objects.

#### Example Talk Object:

```json
{
  "title": "The Future of JavaScript Frameworks",
  "speakers": ["Jane Doe"],
  "category": ["JavaScript", "Web Development"],
  "duration": 60,
  "description": "A deep dive into the trends and future of modern JavaScript frameworks. We will explore the latest features of React, Vue, and Angular and what's next to come."
}
```

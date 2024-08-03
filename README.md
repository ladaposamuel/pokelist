# PokeList

PokeList is a simple a web application that lists Pokemon in a table with pagination, allowing users to like or dislike them if they are logged in. The application will involve multiple organizations, each having multiple users and Pokémon. Users will only see Pokémon that belong to their organization.

<details>
  <summary>Assignment From <a href="https://docs.google.com/document/d/1LOb51__xqFaE7U7xK4cfat6fM4zY8lhVDj7CkD8qxy0/edit#heading=h.8uldosyqpvfb">Google Docs</a></summary>
  
### Overview

Create a web application that lists Pokemon in a table with pagination, allowing users to like or dislike them if they are logged in. The application will involve multiple organizations, each having multiple users and Pokémon. Users will only see Pokémon that belong to their organization.

**Backend: Node.js app with database (up to you to decide the framework and database)**

- Project Initialization:
  - Set up a new Node.js project.
  - Design a database schema with tables for organizations, users, pokemons and favorites.
- Data Generation Script:
  - Write a script to generate up to 10 random organizations.
  - Generate up to 10 random users for each organization.
- API Integration:
  - Fetch Pokémon data from the PokéAPI and import it into the database.
  - Assign Pokémon to organizations randomly.
- User Authentication and Management:
  - Add user registration with the ability to select an organization from a dropdown.
  - Add user login.

**Frontend: Svelte/React/SolidJS**

- Project Setup:
  - Initialize the front-end project using your chosen framework (Svelte, React, or SolidJS).
- User Interface:
  - Create auth pages.
  - Allow users to select their organization during registration, email and password fields (email verification can be omitted).
  - Design a basic page to display pokemon data in a table format, based on user’s organization. Users can only see pokemons from their organization.
  - Implement buttons to like/unlike Pokémon for logged-in users.
  - Implement table pagination.
- User Interaction:
  - Implement feature for likes/dislikes.

> Please ensure that you set up the project as you would for a production application. Pay careful attention to security, error handling, and seamless communication, as these aspects will be reviewed in detail.

</details>

## Getting Started

### Prerequisites

- Node.js 18.x
- Yarn

### Installation

#### Local

1. Clone the repository
2. Install dependencies with `yarn install`
3. Edit the `.env` file with your own values, check the `.env.example` file for more information
4. Run the DB migrations with `yarn db:migrate`
5. Run the server with `yarn start:dev`

#### Production

1. Clone the repository
2. Install dependencies with `yarn install`
3. Edit the `.env` file with your own values, check the `.env.example` file for more information
4. Run the DB migrations with `yarn db:migrate`
5. Build the server with `yarn build`
6. Run the server with `yarn start` or `node ./dist/app.js`

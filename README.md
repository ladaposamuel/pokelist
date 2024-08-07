# PokeList

PokeList is a simple a web application that lists Pokemon in a table with pagination, allowing users to like or dislike them if they are logged in. The application will involve multiple organizations, each having multiple users and Pokémon. Users will only see Pokémon that belong to their organization.

Time spent: 9 Hours <https://wakatime.com/@electrode/projects/jbfenruwvx?start=2024-07-30&end=2024-08-05>

<details>
  <summary>Assignment From <a href="https://docs.google.com/document/d/1LOb51__xqFaE7U7xK4cfat6fM4zY8lhVDj7CkD8qxy0/edit#heading=h.8uldosyqpvfb">Google Docs</a></summary>
  
### Overview

Create a web application that lists Pokemon in a table with pagination, allowing users to like or dislike them if they are logged in. The application will involve multiple organizations, each having multiple users and Pokémon. Users will only see Pokémon that belong to their organization.

**Backend: Node.js app with database (up to you to decide the framework and database)**

- Project Initialization: ✅
  - Set up a new Node.js project.
  - Design a database schema with tables for organizations, users, pokemons and favorites.
- Data Generation Script: ✅
  - Write a script to generate up to 10 random organizations.
  - Generate up to 10 random users for each organization.
- API Integration: ✅
  - Fetch Pokémon data from the PokéAPI and import it into the database.
  - Assign Pokémon to organizations randomly.
- User Authentication and Management: ✅
  - Add user registration with the ability to select an organization from a dropdown.
  - Add user login.

**Frontend: Svelte/React/SolidJS**

- Project Setup: ✅
  - Initialize the front-end project using your chosen framework (Svelte, React, or SolidJS).
- User Interface: ✅
  - Create auth pages.
  - Allow users to select their organization during registration, email and password fields (email verification can be omitted).
  - Design a basic page to display pokemon data in a table format, based on user’s organization. Users can only see pokemons from their organization. ✅
  - Implement buttons to like/unlike Pokémon for logged-in users.  
  - Implement table pagination.
- User Interaction:✅
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
4. Run the DB migrations with `yarn typeorm:migrate`
5. Run the DB seeder with `yarn typeorm seed:run` to populate the database with data and pokemons from the PokéAPI
6. Run the server with `yarn start:dev`

![Server start](https://i.imgur.com/PiaF0QD.png)

#### Notes

A simiple Express TypeScript project, that uses TypeORM for database management.
I decided not use any framework, such as NestJS, but I used some of their coding style and patterns,
following the directory structure of the project below, everything is in the `src` directory, and the `app.ts` file is the entry point.
The database is configured in the `src/database/connection.ts` file, and the migrations are in the `src/database/migrations` directory, the seeders are in the `src/database/seeders` directory and the entities are in the `src/database/entities` directory.

The project is configured to use the PokéAPI to fetch pokemon data, and to assign them to organizations randomly in the `src/database/seeders/pokemonSeeder.ts` file.

```bash
.
├── README.md
├── package.json
├── src
│   ├── app
│   ├── app.ts
│   ├── cli
│   ├── controllers
│   ├── database
│   ├── middleware
│   ├── schemas
│   ├── services
│   └── util
├── tsconfig.json
└── yarn.lock

19 directories, 7 files
```

The database schema and relationship is Users, Organizations, Pokemons, Favorites, and the relationships are as follows:

![Screenshot 2024-08-05 at 9 34 31 PM](
  https://imgur.com/bokLtZl.png
)

### Routes

List of the routes in the API

| Route Name           | Route                 | Description                                                   | Sample Request | Sample Response |
|----------------------|-----------------------|---------------------------------------------------------------|----------------|-----------------|
| Login                | /user/login           | User Login                                                    |                |                 |
| Register             | /user/register        | User Signup                                                   |                |                 |
| User Profile         | /user/me              | Show user's details                                           |                |                 |
| Get all Organisation | /organisations        | List all orgs with their pokemons                             |                |                 |
| Get an Organisation  | /organisations/:id    |                                                               |                |                 |
| Get Pokemons         | /pokemon/all          | Get all pokemons in an org by using user Id in the auth token |                |                 |
| Favorite a pokemon   | /pokemon/favorite/:id | Favorite a pokemon using it's ID                              |                |                 |

#### Takeaways

- It was difficult to manipulate the request response especially when the class and structure is all relying on the enitity classes, when I started passwords for example was in the user response, I had to install and use class-transformer and `@Exclude`.
- I learnet to  completely separate the REST API model from the database model by having a DTO class <https://stackoverflow.com/a/75436936/5309558>
- I didnt completely handle request validation especially on the middleware level, I did most of it in the controllers, but I had to install and use zod for user registeration.
- I didnt test after running build, even though the command ran successfully.

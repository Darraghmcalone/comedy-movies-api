const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
enum Status {
    WATCHED
    INTERESTED
    NOTINTERESTED
    UNKNOWN
  }

  type Actor {
    id: ID
    name: String
  }

  type Movie {
    title: String
    releaseDate: String
    rating: Int
    id: ID!
    status: Status
    actor: [Actor] 
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }
`;

const movies = [
    {
        id: "567Mgjkais",
        title: "Advengers: Endgame",
        releaseDate: "25-04-2019",
        rating: 8
    },
    {
        id: "0IZMrjveit",
        title: "Joker",
        releaseDate: "04-10-2019",
        rating: 8,
    },
    {
        id: "22YDMexaeiz",
        title: "The Dark Knight",
        releaseDate: "21-07-2008",
        rating: 9,
        actor: [
            {
                id: "567asdfasdf",
                name: " Christian Bale"
            }
        ]
    }
];

const resolvers = {
    Query: {
        movies: () => {
            return movies;
        },
        movie: ({ id }) => {
            const foundMovie = movies.find(movie => {
                return movie.id === id;
            });
            return foundMovie;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server started at ${url}`);
});

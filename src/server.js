import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { authenticateJwt } from "./passport";


const PORT = process.env.PORT || 4000;

// context는 resolver 사이에서 정보 공유할 때 사용
const server = new GraphQLServer({ schema, 
  context: ({request}) => ({ request})
  // passport의 req와 여기의 req는 다르다. 이 중에 passport의 req 가 들어있을 것.
});


server.express.use(logger("dev"));
server.express.use(authenticateJwt);


server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
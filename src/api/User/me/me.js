import { prisma } from "../../../../generated/prisma-client";
// import USER_FRAGMENT from "../../../fragments"

export default {
  Query: {
    me: async(_, __, {request, isAuthenticated}) => {
      isAuthenticated(request);
      const { user }= request;
      const userProfile = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).posts();
      return {
        user: userProfile, 
        posts
      }
      
    // return prisma.user({ id: user.id }).$fragment(USER_FRAGMENT);
    // return prisma.user({ id: user.id }).posts(); 
    // 하면 post만 받아올 수 있음.

    }
  }
}
import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async(_, args) => {
      const {id} = args;
      const post = await prisma.post({id});
      const comments = await prisma.post({id}).comments().$fragment(COMMENT_FRAGMENT);
      // const comments = post.comments() 은 안되나...?
      const likeCount = await prisma.likesConnection(
        {where: {post: {id: id}}
      })
      .aggregate()
      .count();
      return {
        post, comments, likeCount
      }
    }
  }
}
export const USER_FRAGMENT = `
  fragment UserParts on User{
    id
    username
    email
    posts {
      id
      caption
    }
  }

`
export const COMMENT_FRAGMENT = `
  fragment CommentParts on Comment{
    id
    text
    user {
      id
      username
    }
  }

`
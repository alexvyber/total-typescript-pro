import { it } from "vitest";
import { Brand } from "../helpers/Brand";
import { Equal, Expect } from "../helpers/type-utils";

type PostId = Brand<string, "PostId">;
type UserId = Brand<string, "UserId">;

interface User {
  id: UserId;
  name: string;
}

interface Post {
  id: PostId;
  title: string;
}

/**
 * Change this type definition! We should be able to
 * add users and posts to the db by their id.
 *
 * You'll need an index signature of some kind - or maybe
 * two!
 */

const db: {
  [userId: UserId]: User;
  [postId: PostId]: Post;
} = {};

it("Should let you add users and posts to the db by their id", () => {
  const postId = "post_1" as PostId;
  const userId = "user_1" as UserId;

  db[postId] = {
    id: postId,
    title: "Hello world",
  };

  db[userId] = {
    id: userId,
    name: "Miles",
  };

  const post = db[postId];
  const user = db[userId];

  type tests = [
    Expect<Equal<typeof post, Post>>,
    Expect<Equal<typeof user, User>>
  ];
});

it("Should fail if you try to add a user under a post id", () => {
  const postId = "post_1" as PostId;
  const userId = "user_1" as UserId;

  const user: User = {
    id: userId,
    name: "Miles",
  };

  // @ts-expect-error
  db[postId] = user;
});

type One = { id: UserId };
type Two = { id: PostId };

type Some = {
  [one: UserId]: User;
  [two: PostId]: Post;
};

type Some1 = Record<UserId, User> & Record<PostId, Post>;
type Some2 = {
  [one: UserId]: User;
} & {
  [two: PostId]: Post;
};
// {
//   [one: UserId]: User;
//   [two: PostId]: Post;
// };

const some: Some1 = {};

const one = "asdf" as UserId;
const two = "qwer" as PostId;

some[one] = {
  id: one,
  name: "Miles",
};

some[two] = {
  id: two,
  title: "Hello world",
};

const asdf = some[one];
const qwer = some[two];

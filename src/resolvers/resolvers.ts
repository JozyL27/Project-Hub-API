import { listQueries, listMutations, List } from "../lists/lists-resolvers";
import {
  projectsMutations,
  projectQueries,
} from "../projects/projects-resolvers";

const Query = {
  greeting: () => "hello world!",
  ...listQueries,
  ...projectQueries,
};

const Mutation = {
  ...listMutations,
  ...projectsMutations,
};

export { Query, Mutation, List };

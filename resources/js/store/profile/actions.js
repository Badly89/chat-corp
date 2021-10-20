import { CHANGE_NAME } from "./types";

export const changeName = (newName) => ({
  type: CHANGE_NAME,
  name: newName,
});

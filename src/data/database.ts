import { FSDB } from "file-system-db";
// Using file-sys-db for persistence

const db = new FSDB("./db.json", false);

type User = {
  email: string;
  allowance: number;
  lastTransaction: number;
};

export { db, User };

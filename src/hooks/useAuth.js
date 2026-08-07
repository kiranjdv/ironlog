import { useState, useEffect } from "react";
import { dbGetAll, dbGet, dbPut, dbDelete } from "../utils/db";
import { hashPassword } from "../utils/crypto";

export function useAuth(db) {
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    async function loadAuth() {
      try {
        const usersArray = await dbGetAll(db, "users");
        const usersObj = {};
        usersArray.forEach(u => {
          usersObj[u.email] = { name: u.name, pass: u.pass };
        });
        setUsers(usersObj);

        const currentUserVal = await dbGet(db, "kv", "currentUser");
        setCurrentUser(currentUserVal || null);
      } catch (err) {
        console.error("Failed to load auth state", err);
      } finally {
        setLoading(false);
      }
    }
    loadAuth();
  }, [db]);

  const saveUsers = async (v) => {
    setUsers(v);
    if (!db) return;
    for (const [email, u] of Object.entries(v)) {
      await dbPut(db, "users", { email, name: u.name, pass: u.pass });
    }
  };

  const register = async (name, email, pass) => {
    if (users[email]) return "Email already registered";
    const hashedPassword = await hashPassword(pass);
    await saveUsers({ ...users, [email]: { name, pass: hashedPassword } });
    setCurrentUser(email);
    if (db) await dbPut(db, "kv", email, "currentUser");
    return null;
  };

  const login = async (email, pass) => {
    if (!users[email]) return "No account found";
    const storedPass = users[email].pass;
    const isHashed = typeof storedPass === "string" && storedPass.length === 64 && /^[0-9a-f]{64}$/i.test(storedPass);

    if (isHashed) {
      const hashedPassword = await hashPassword(pass);
      if (storedPass !== hashedPassword) return "Wrong password";
    } else {
      if (storedPass !== pass) return "Wrong password";
      const hashedPassword = await hashPassword(pass);
      await saveUsers({ ...users, [email]: { ...users[email], pass: hashedPassword } });
    }

    setCurrentUser(email);
    if (db) await dbPut(db, "kv", email, "currentUser");
    return null;
  };

  const logout = async () => {
    setCurrentUser(null);
    if (db) {
      await dbDelete(db, "kv", "currentUser");
      await dbDelete(db, "kv", "active");
      await dbDelete(db, "kv", "startTime");
      await dbDelete(db, "kv", "timerOn");
      await dbDelete(db, "kv", "token");
      await dbDelete(db, "kv", "last_synced");
    }
  };

  return { users, currentUser, register, login, logout, loading };
}

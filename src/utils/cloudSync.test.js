import {
  encryptPayload,
  decryptPayload,
  createDatabaseSnapshot,
  restoreDatabaseSnapshot,
} from "./cloudSync";
import { getDb, dbPut, dbGet, dbGetAll } from "./db";

describe("CloudSync: Zero-Knowledge Encryption", () => {
  test("encrypts and decrypts payload correctly with passphrase", async () => {
    const rawData = JSON.stringify({
      workouts: [{ id: "w1", date: "2026-11-03", name: "Leg Day" }],
      secretNotes: "Heavy squats",
    });
    const passphrase = "SuperSecretIronPassphrase#2026";

    const encrypted = await encryptPayload(rawData, passphrase);

    expect(encrypted).not.toContain("Heavy squats");
    expect(encrypted).toContain("AES-GCM-256");

    const decrypted = await decryptPayload(encrypted, passphrase);
    expect(decrypted).toBe(rawData);
    expect(JSON.parse(decrypted).workouts[0].name).toBe("Leg Day");
  });

  test("fails decryption with wrong passphrase", async () => {
    const rawData = "Confidential PR Data";
    const encrypted = await encryptPayload(rawData, "RightPassword123");

    await expect(decryptPayload(encrypted, "WrongPassword456")).rejects.toThrow(
      /Decryption failed/
    );
  });

  test("handles empty passphrase transparently", async () => {
    const rawData = JSON.stringify({ test: "unencrypted" });
    const encrypted = await encryptPayload(rawData, "");
    expect(encrypted).toBe(rawData);

    const decrypted = await decryptPayload(encrypted, "");
    expect(decrypted).toBe(rawData);
  });
});

describe("CloudSync: Database Snapshot and Restore", () => {
  test("creates snapshot and restores it cleanly into mock database", async () => {
    const db = await getDb();

    // Populate some data in mock db
    await dbPut(db, "users", { email: "lifter@ironlog.io", name: "Alex", pass: "saltedhash" });
    await dbPut(db, "workouts", { id: "w101", user: "lifter@ironlog.io", date: "2026-11-03" });
    await dbPut(db, "kv", { unit: "kg", theme: "dark" }, "settings");

    const snapshot = await createDatabaseSnapshot(db);
    expect(snapshot.il_users).toBeDefined();
    expect(snapshot.il_workouts).toBeDefined();
    expect(snapshot.il_settings).toBeDefined();

    // Now restore into db
    await restoreDatabaseSnapshot(db, snapshot);

    const users = await dbGetAll(db, "users");
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].email).toBe("lifter@ironlog.io");

    const settings = await dbGet(db, "kv", "settings");
    expect(settings.unit).toBe("kg");
  });
});

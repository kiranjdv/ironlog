import { hashPassword } from "./crypto";

test("hashes password to correct SHA-256 hex string", async () => {
  const hash = await hashPassword("password123");
  // SHA-256 hash of "password123"
  expect(hash).toBe("ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f");
  expect(hash).toHaveLength(64);
});

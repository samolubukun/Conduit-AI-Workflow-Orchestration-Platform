import Cryptr from "cryptr";

const encryptionKey = process.env.ENCRYPTION_KEY || "conduit-build-fallback-encryption-key-32-chars";
const cryptr = new Cryptr(encryptionKey);

export const encrypt = (text: string) => cryptr.encrypt(text);
export const decrypt = (text: string) => cryptr.decrypt(text);

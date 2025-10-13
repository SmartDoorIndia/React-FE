// src/utils/aesDecrypt.js
import CryptoJS from "crypto-js";

export function decryptSmartLockId(encryptedBase64) {
  // Must exactly match your Java constants
  const SECRET_KEY = "97A8423AA9FAD16AF5D0FFA531DDB6A5";
  const INIT_VECTOR = "9HBX63BSWJS7MZN7";

  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(INIT_VECTOR);

  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}

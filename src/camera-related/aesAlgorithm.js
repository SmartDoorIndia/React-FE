var CryptoJS = require("crypto-js");

class AesAlgo {
  keyFilter(timeMillis, appSecret) {
    let key = "";
    const timeLength = timeMillis.length;
    if (timeLength / 2 > 0) {
      key += timeMillis.substring(Math.floor(timeLength / 2));
    }
    key += appSecret;
    return this.filter(key);
  }

  filter(key) {
    const length = key.length;
    if (length > 16) {
      key = key.substring(0, 16);
    } else {
      for (let i = 0; i < 16 - length; ++i) {
        key += i.toString();
      }
    }
    return key;
  }

  // encryptWithAES(key) {
  //   const cryptr = new Cryptr(key);
  //   const encryptedString = cryptr.encrypt('bacon');
  //   const decryptedString = cryptr.decrypt(encryptedString); 

  //   console.log("encryptedString:", encryptedString);
  //   console.log("decryptedString:", decryptedString);
  // }

  // encryptWithAES(key, plainText) {
  //   const cipherKey = encrypt.Key.fromUtf8(key);
  //   const encryptService = new encrypt.Encrypter(
  //     new encrypt.AES(cipherKey, {
  //       mode: encrypt.AESMode.ecb,
  //       padding: "PKCS7",
  //     })
  //   );
  //   const initVector = encrypt.IV.fromUtf8(key.substring(0, 16));
  //   const encryptedData = encryptService.encrypt(plainText, {
  //     iv: initVector,
  //   });
  //   return encryptedData.base16;
  // }

  encryptWithAES(key, plainText) { 
    const cipherKey = CryptoJS.enc.Utf8.parse(key); 
    const encryptService = CryptoJS.AES.encrypt(plainText, cipherKey, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }); 
    // const initVector = CryptoJS.enc.Utf8.parse(key.substring(0, 16)); 
    return encryptService.ciphertext.toString(CryptoJS.enc.Hex); 
  }
}

export default AesAlgo;

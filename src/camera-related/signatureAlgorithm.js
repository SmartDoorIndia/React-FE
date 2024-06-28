var md5 = require('md5');

class SignatureAlgo {

    change(encryptStr, moveCard) {
        let encryptByte = new TextEncoder().encode(encryptStr);
        let encryptLength = encryptByte.length;
        let temp;
        for (let i = 0; i < encryptLength; i++) {
            temp = (((i % moveCard) > ((encryptLength - i) % moveCard)) ? encryptByte[i] : encryptByte[encryptLength - (i + 1)]);
            encryptByte[i] = encryptByte[encryptLength - (i + 1)];
            encryptByte[encryptLength - (i + 1)] = temp;
        }
        return encryptByte;
    }

    mergeByte(encryptByte, changeByte) {
        let encryptLength = encryptByte.length;
        let encryptLength2 = (encryptLength * 2);
        let temp = new Uint8Array(encryptLength2);
        for (let i = 0; i < encryptByte.length; i++) {
            temp[i] = encryptByte[i];
            temp[(encryptLength2 - 1) - i] = changeByte[i];
        }
        return temp;
    }
    

    getEncryptStr(uuid, appKey, appSecret, timeMillis, movedCard) {
        let encryptStr = uuid + appKey + appSecret + timeMillis;
        let encryptByte = new TextEncoder().encode(encryptStr);
        let changeByte = this.change(encryptStr, movedCard);
        let mergeByte = this.mergeByte(encryptByte, changeByte);
        let digest = md5(mergeByte);
        return digest.toString();
    }

}

export default SignatureAlgo;
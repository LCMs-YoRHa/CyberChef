/**
 * @author LCMs-YoRHa [Tlbxgi@outlook.com]
 * @copyright Crown Copyright 2025
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Values Encoding operation
 */
class ValuesEncoding extends Operation {
    /**
     * ValuesEncoding constructor
     */
    constructor() {
        super();

        this.name = "Values Encoding";
        this.module = "Default";
        this.description = "使用社会主义核心价值观进行编码和解码。";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "操作",
                "type": "option",
                "value": ["编码", "解码"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [operation] = args;
        
        // 社会主义核心价值观
        const values = '富强民主文明和谐自由平等公正法治爱国敬业诚信友善';
        
        if (operation === "编码") {
            return this.valuesEncode(input, values);
        } else {
            return this.valuesDecode(input, values);
        }
    }
    
    /**
     * 将字符串转换为UTF-8十六进制表示
     */
    str2utf8(str) {
        const notEncoded = /[A-Za-z0-9\-\_\.\!\~\*\'\(\)]/g;
        const str1 = str.replace(notEncoded, c => c.codePointAt(0).toString(16));
        let str2 = encodeURIComponent(str1);
        const concated = str2.replace(/%/g, '').toUpperCase();
        return concated;
    }
    
    /**
     * 将UTF-8十六进制表示转换回字符串
     */
    utf82str(utfs) {
        if (typeof utfs !== 'string') {
            throw new Error('输入必须是字符串');
        }
        
        const l = utfs.length;
        
        if ((l & 1) !== 0) {
            throw new Error('输入长度必须是偶数');
        }
        
        const splited = [];
        
        for (let i = 0; i < l; i++) {
            if ((i & 1) === 0) {
                splited.push('%');
            }
            splited.push(utfs[i]);
        }
        
        try {
            return decodeURIComponent(splited.join(''));
        } catch (e) {
            throw new Error('解码过程出错: ' + e.message);
        }
    }
    
    /**
     * 生成随机二进制值
     */
    randBin() {
        return Math.random() >= 0.5;
    }
    
    /**
     * 十六进制转十二进制数组
     */
    hex2duo(hexs) {
        const duo = [];
        
        for (let c of hexs) {
            const n = Number.parseInt(c, 16);
            if (n < 10) {
                duo.push(n);
            } else {
                if (this.randBin()) {
                    duo.push(10);
                    duo.push(n - 10);
                } else {
                    duo.push(11);
                    duo.push(n - 6);
                }
            }
        }
        return duo;
    }
    
    /**
     * 十二进制数组转十六进制字符串
     */
    duo2hex(duo) {
        const hex = [];
        const l = duo.length;
        let i = 0;
        
        while (i < l) {
            if (duo[i] < 10) {
                hex.push(duo[i]);
            } else {
                if (duo[i] === 10) {
                    i++;
                    hex.push(duo[i] + 10);
                } else {
                    i++;
                    hex.push(duo[i] + 6);
                }
            }
            i++;
        }
        return hex.map(v => v.toString(16).toUpperCase()).join('');
    }
    
    /**
     * 十二进制数组转价值观字符串
     */
    duo2values(duo, values) {
        return duo.map(d => values[2*d] + values[2*d+1]).join('');
    }
    
    /**
     * 价值观解码
     */
    valuesDecode(encoded, values) {
        const duo = [];
        
        for (let c of encoded) {
            const i = values.indexOf(c);
            if (i !== -1 && (i & 1) === 0) {
                // i 是偶数
                duo.push(i >> 1);
            }
        }
        
        const hexs = this.duo2hex(duo);
        
        if ((hexs.length & 1) !== 0) {
            throw new Error('解码后的十六进制长度必须是偶数');
        }
        
        return this.utf82str(hexs);
    }
    
    /**
     * 价值观编码
     */
    valuesEncode(str, values) {
        return this.duo2values(this.hex2duo(this.str2utf8(str)), values);
    }
}

export default ValuesEncoding;
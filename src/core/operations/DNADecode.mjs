/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2024
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * DNA Decode operation
 */
class DNADecode extends Operation {
    /**
     * DNADecode constructor
     */
    constructor() {
        super();

        this.name = "DNA Decode";
        this.module = "Default";
        this.description = "将DNA序列（A、T、C、G）解码为文本。每两个核苷酸组合映射到一个ASCII字符。";
        this.infoURL = "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "映射方案",
                "type": "option",
                "value": ["标准映射 (AT=0, CG=1)", "替代映射 (AC=0, GT=1)"]
            },
            {
                "name": "忽略无效字符",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                pattern: "^[ATCGatcg]+$",
                flags: "",
                args: ["标准映射 (AT=0, CG=1)", true]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [mappingScheme, ignoreInvalid] = args;
        
        // 将输入转换为大写
        input = input.toUpperCase();
        
        // 过滤掉无效字符
        if (ignoreInvalid) {
            input = input.replace(/[^ATCG]/g, "");
        } else if (!/^[ATCG]+$/.test(input)) {
            throw new Error("输入包含无效的DNA字符。只允许A、T、C、G。");
        }
        
        // 确保输入长度为偶数
        if (input.length % 2 !== 0) {
            throw new Error("DNA序列长度必须为偶数，每两个核苷酸组合映射到一个字符。");
        }
        
        let output = "";
        
        // 根据选择的映射方案创建DNA到二进制的映射
        let dnaToBit = {};
        if (mappingScheme === "标准映射 (AT=0, CG=1)") {
            dnaToBit = { "A": "0", "T": "0", "C": "1", "G": "1" };
        } else {
            dnaToBit = { "A": "0", "C": "0", "G": "1", "T": "1" };
        }
        
        // 将DNA序列转换为二进制
        let binaryString = "";
        for (let i = 0; i < input.length; i++) {
            binaryString += dnaToBit[input[i]];
        }
        
        // 将二进制转换为ASCII字符（每8位一个字符）
        for (let i = 0; i < binaryString.length; i += 8) {
            if (i + 8 <= binaryString.length) {
                const byte = binaryString.substring(i, i + 8);
                output += String.fromCharCode(parseInt(byte, 2));
            }
        }
        
        return output;
    }
}

export default DNADecode;
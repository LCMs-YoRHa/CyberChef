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
        this.description = "将DNA序列（A、T、C、G）解码为文本。根据特定的二进制到DNA和DNA到字符映射规则进行解码。";
        this.infoURL = "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "输入类型",
                "type": "option",
                "value": ["二进制字符串", "DNA序列"]
            },
            {
                "name": "忽略无效字符",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                pattern: "^[01]+$",
                flags: "",
                args: ["二进制字符串", true]
            },
            {
                pattern: "^[ATCGatcg]+$",
                flags: "",
                args: ["DNA序列", true]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [inputType, ignoreInvalid] = args;
        
        // 定义映射规则
        const bin_dna = {
            '00': 'A',
            '10': 'C',
            '01': 'G',
            '11': 'T'
        };
        
        const mapping = {
            'AAA': 'a', 'AAC': 'b', 'AAG': 'c', 'AAT': 'd',
            'ACA': 'e', 'ACC': 'f', 'ACG': 'g', 'ACT': 'h',
            'AGA': 'i', 'AGC': 'j', 'AGG': 'k', 'AGT': 'l',
            'ATA': 'm', 'ATC': 'n', 'ATG': 'o', 'ATT': 'p',
            'CAA': 'q', 'CAC': 'r', 'CAG': 's', 'CAT': 't',
            'CCA': 'u', 'CCC': 'v', 'CCG': 'w', 'CCT': 'x',
            'CGA': 'y', 'CGC': 'z', 'CGG': 'A', 'CGT': 'B',
            'CTA': 'C', 'CTC': 'D', 'CTG': 'E', 'CTT': 'F',
            'GAA': 'G', 'GAC': 'H', 'GAG': 'I', 'GAT': 'J',
            'GCA': 'K', 'GCC': 'L', 'GCG': 'M', 'GCT': 'N',
            'GGA': 'O', 'GGC': 'P', 'GGG': 'Q', 'GGT': 'R',
            'GTA': 'S', 'GTC': 'T', 'GTG': 'U', 'GTT': 'V',
            'TAA': 'W', 'TAC': 'X', 'TAG': 'Y', 'TAT': 'Z',
            'TCA': '1', 'TCC': '2', 'TCG': '3', 'TCT': '4',
            'TGA': '5', 'TGC': '6', 'TGG': '7', 'TGT': '8',
            'TTA': '9', 'TTC': '0', 'TTG': ' ', 'TTT': '.'
        };
        
        // 清理输入
        input = input.replace(/\s+/g, "");
        
        let dnaString = "";
        
        if (inputType === "二进制字符串") {
            // 从二进制字符串转换为DNA序列
            if (ignoreInvalid) {
                input = input.replace(/[^01]/g, "");
            } else if (!/^[01]+$/.test(input)) {
                throw new Error("二进制输入包含无效字符。只允许0和1。");
            }
            
            // 确保输入长度为偶数
            if (input.length % 2 !== 0) {
                throw new Error("二进制字符串长度必须为偶数，每两位对应一个DNA字符。");
            }
            
            // 每两位二进制转换为一个DNA字符
            for (let i = 0; i < input.length; i += 2) {
                const binPair = input.substring(i, i + 2);
                if (bin_dna[binPair]) {
                    dnaString += bin_dna[binPair];
                } else if (!ignoreInvalid) {
                    throw new Error(`未知的二进制对: ${binPair}`);
                }
            }
        } else {
            // 直接使用DNA序列
            if (ignoreInvalid) {
                dnaString = input.replace(/[^ATCGatcg]/g, "");
            } else if (!/^[ATCGatcg]+$/.test(input)) {
                throw new Error("DNA序列包含无效字符。只允许A、T、C、G。");
            } else {
                dnaString = input;
            }
        }
        
        // 将DNA序列转换为大写
        dnaString = dnaString.toUpperCase();
        
        // 确保DNA序列长度是3的倍数
        if (dnaString.length % 3 !== 0) {
            throw new Error("DNA序列长度必须是3的倍数，每三个核苷酸对应一个字符。");
        }
        
        // 解码DNA序列为文本
        let output = "";
        for (let i = 0; i < dnaString.length; i += 3) {
            const codon = dnaString.substring(i, i + 3);
            if (mapping[codon]) {
                output += mapping[codon];
            } else if (!ignoreInvalid) {
                throw new Error(`未知的DNA密码子: ${codon}`);
            }
        }
        
        return output;
    }
}

export default DNADecode;
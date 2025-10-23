/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2024
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * DNA Encode operation
 */
class DNAEncode extends Operation {
    /**
     * DNAEncode constructor
     */
    constructor() {
        super();

        this.name = "DNA Encode";
        this.module = "Default";
        this.description = "将文本编码为DNA序列（A、T、C、G）。根据特定的字符到DNA密码子映射规则进行编码。";
        this.infoURL = "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "输出类型",
                "type": "option",
                "value": ["DNA序列", "二进制字符串"]
            },
            {
                "name": "分隔符",
                "type": "option",
                "value": ["无分隔符", "空格分隔密码子", "逗号分隔密码子"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [outputType, separator] = args;
        
        // 定义映射规则（从解码的mapping反向创建）
        const mapping = {
            'a': 'AAA', 'b': 'AAC', 'c': 'AAG', 'd': 'AAT',
            'e': 'ACA', 'f': 'ACC', 'g': 'ACG', 'h': 'ACT',
            'i': 'AGA', 'j': 'AGC', 'k': 'AGG', 'l': 'AGT',
            'm': 'ATA', 'n': 'ATC', 'o': 'ATG', 'p': 'ATT',
            'q': 'CAA', 'r': 'CAC', 's': 'CAG', 't': 'CAT',
            'u': 'CCA', 'v': 'CCC', 'w': 'CCG', 'x': 'CCT',
            'y': 'CGA', 'z': 'CGC', 'A': 'CGG', 'B': 'CGT',
            'C': 'CTA', 'D': 'CTC', 'E': 'CTG', 'F': 'CTT',
            'G': 'GAA', 'H': 'GAC', 'I': 'GAG', 'J': 'GAT',
            'K': 'GCA', 'L': 'GCC', 'M': 'GCG', 'N': 'GCT',
            'O': 'GGA', 'P': 'GGC', 'Q': 'GGG', 'R': 'GGT',
            'S': 'GTA', 'T': 'GTC', 'U': 'GTG', 'V': 'GTT',
            'W': 'TAA', 'X': 'TAC', 'Y': 'TAG', 'Z': 'TAT',
            '1': 'TCA', '2': 'TCC', '3': 'TCG', '4': 'TCT',
            '5': 'TGA', '6': 'TGC', '7': 'TGG', '8': 'TGT',
            '9': 'TTA', '0': 'TTC', ' ': 'TTG', '.': 'TTT'
        };
        
        // DNA到二进制的映射
        const dna_to_bin = {
            'A': '00',
            'C': '10',
            'G': '01',
            'T': '11'
        };
        
        let dnaOutput = "";
        
        // 将输入文本转换为DNA序列
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            if (mapping[char]) {
                dnaOutput += mapping[char];
            } else {
                // 对于不在映射表中的字符，可以选择跳过或抛出错误
                // 这里选择跳过并记录一个警告
                console.warn(`字符 '${char}' 不在映射表中，已跳过`);
            }
        }
        
        // 根据输出类型处理结果
        let output = "";
        if (outputType === "二进制字符串") {
            // 将DNA序列转换为二进制字符串
            for (let i = 0; i < dnaOutput.length; i++) {
                output += dna_to_bin[dnaOutput[i]];
            }
        } else {
            // 直接使用DNA序列
            output = dnaOutput;
        }
        
        // 应用分隔符
        if (separator === "空格分隔密码子") {
            // 每3个字符加一个空格（表示一个密码子）
            output = output.replace(/.{3}/g, "$& ").trim();
        } else if (separator === "逗号分隔密码子") {
            // 每3个字符加一个逗号
            output = output.replace(/.{3}/g, "$&,").slice(0, -1);
        }
        
        return output;
    }
}

export default DNAEncode;
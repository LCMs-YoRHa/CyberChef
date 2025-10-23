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
        this.description = "将文本编码为DNA序列（A、T、C、G）。每个ASCII字符映射到四个核苷酸。";
        this.infoURL = "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "映射方案",
                "type": "option",
                "value": ["标准映射 (0=AT, 1=CG)", "替代映射 (0=AC, 1=GT)"]
            },
            {
                "name": "分隔符",
                "type": "option",
                "value": ["无分隔符", "空格分隔", "逗号分隔", "每4个字符加空格"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [mappingScheme, separator] = args;
        let output = "";
        
        // 根据选择的映射方案创建二进制到DNA的映射
        let bitToDna = [];
        if (mappingScheme === "标准映射 (0=AT, 1=CG)") {
            bitToDna = { "0": ["A", "T"], "1": ["C", "G"] };
        } else {
            bitToDna = { "0": ["A", "C"], "1": ["G", "T"] };
        }
        
        // 将每个字符转换为8位二进制，然后映射到DNA序列
        for (let i = 0; i < input.length; i++) {
            const charCode = input.charCodeAt(i);
            const binary = charCode.toString(2).padStart(8, "0");
            
            for (let j = 0; j < binary.length; j++) {
                const bit = binary[j];
                // 随机选择映射方案中的一个碱基（增加生物学真实性）
                const randomChoice = Math.floor(Math.random() * 2);
                output += bitToDna[bit][randomChoice];
            }
        }
        
        // 应用分隔符
        if (separator === "空格分隔") {
            // 每2个字符加一个空格（表示一个bit对）
            output = output.replace(/.{2}/g, "$& ").trim();
        } else if (separator === "逗号分隔") {
            // 每2个字符加一个逗号
            output = output.replace(/.{2}/g, "$&,").slice(0, -1);
        } else if (separator === "每4个字符加空格") {
            // 每4个字符加一个空格（表示一个byte）
            output = output.replace(/.{4}/g, "$& ").trim();
        }
        
        return output;
    }
}

export default DNAEncode;
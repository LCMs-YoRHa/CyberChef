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
        this.description = "Decodes DNA sequences (A, T, C, G) to text using a specific DNA codon to character mapping.";
        this.infoURL = "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Ignore invalid characters",
                "type": "boolean",
                "value": true
            }
        ];
        this.checks = [
            {
                pattern: "^[ATCGatcg]+$",
                flags: "",
                args: [true]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [ignoreInvalid] = args;
        
        // Define mapping rules
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
        
        // Clean input
        input = input.replace(/\s+/g, "");
        
        // Filter invalid characters if option is enabled
        let dnaString = "";
        if (ignoreInvalid) {
            dnaString = input.replace(/[^ATCGatcg]/g, "");
        } else if (!/^[ATCGatcg]+$/.test(input)) {
            throw new Error("Input contains invalid DNA characters. Only A, T, C, G are allowed.");
        } else {
            dnaString = input;
        }
        
        // Convert DNA sequence to uppercase
        dnaString = dnaString.toUpperCase();
        
        // Ensure DNA sequence length is a multiple of 3
        if (dnaString.length % 3 !== 0) {
            throw new Error("DNA sequence length must be a multiple of 3, as each character corresponds to 3 nucleotides.");
        }
        
        // Decode DNA sequence to text
        let output = "";
        for (let i = 0; i < dnaString.length; i += 3) {
            const codon = dnaString.substring(i, i + 3);
            if (mapping[codon]) {
                output += mapping[codon];
            } else if (!ignoreInvalid) {
                throw new Error(`Unknown DNA codon: ${codon}`);
            }
        }
        
        return output;
    }
}

export default DNADecode;
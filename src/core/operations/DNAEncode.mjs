/**
 * @author LCMs-YoRHa [Tlbxgi@outlook.com]
 * @copyright Crown Copyright 2025
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
        this.description = "Encodes text to DNA sequences using a specific character to DNA codon mapping.";
        this.infoURL = "https://en.wikipedia.org/wiki/DNA_and_RNA_codon_tables";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                "name": "Delimiter",
                "type": "option",
                "value": ["None", "Space", "Comma", "Semicolon", "Colon"]
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [delimiter] = args;

        // Create character to DNA codon mapping
        const mapping = {
            "a": "AAA", "b": "AAC", "c": "AAG", "d": "AAT",
            "e": "ACA", "f": "ACC", "g": "ACG", "h": "ACT",
            "i": "AGA", "j": "AGC", "k": "AGG", "l": "AGT",
            "m": "ATA", "n": "ATC", "o": "ATG", "p": "ATT",
            "q": "CAA", "r": "CAC", "s": "CAG", "t": "CAT",
            "u": "CCA", "v": "CCC", "w": "CCG", "x": "CCT",
            "y": "CGA", "z": "CGC", "A": "CGG", "B": "CGT",
            "C": "CTA", "D": "CTC", "E": "CTG", "F": "CTT",
            "G": "GAA", "H": "GAC", "I": "GAG", "J": "GAT",
            "K": "GCA", "L": "GCC", "M": "GCG", "N": "GCT",
            "O": "GGA", "P": "GGC", "Q": "GGG", "R": "GGT",
            "S": "GTA", "T": "GTC", "U": "GTG", "V": "GTT",
            "W": "TAA", "X": "TAC", "Y": "TAG", "Z": "TAT",
            "1": "TCA", "2": "TCC", "3": "TCG", "4": "TCT",
            "5": "TGA", "6": "TGC", "7": "TGG", "8": "TGT",
            "9": "TTA", "0": "TTC", " ": "TTG", ".": "TTT"
        };

        // Select delimiter
        let delimiterStr = "";
        switch (delimiter) {
            case "Space":
                delimiterStr = " ";
                break;
            case "Comma":
                delimiterStr = ",";
                break;
            case "Semicolon":
                delimiterStr = ";";
                break;
            case "Colon":
                delimiterStr = ":";
                break;
        }

        // Encode process
        const result = [];
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            if (mapping[char]) {
                result.push(mapping[char]);
            } else {
                // Throw error if character is not in mapping table
                throw new Error(`Cannot encode character: ${char}, it is not in the mapping table.`);
            }
        }

        // Return DNA sequence with optional delimiter
        return result.join(delimiterStr);
    }
}

export default DNAEncode;

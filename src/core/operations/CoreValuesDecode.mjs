/**
 * @author LCMs-YoRHa [Tlbxgi@outlook.com]
 * @copyright Crown Copyright 2025
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Core Values Decode operation
 */
class CoreValuesDecode extends Operation {
    /**
     * CoreValuesDecode constructor
     */
    constructor() {
        super();

        this.name = "Core Values Decode";
        this.module = "Default";
        this.description = "Decodes Core Socialist Values characters back to original text using the corresponding decoding algorithm.";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        // Core Socialist Values
        const values = "富强民主文明和谐自由平等公正法治爱国敬业诚信友善";

        return this.valuesDecode(input, values);
    }

    /**
     * Converts UTF-8 hex representation back to string
     */
    utf82str(utfs) {
        if (typeof utfs !== "string") {
            throw new Error("Input must be a string");
        }

        const l = utfs.length;

        if ((l & 1) !== 0) {
            throw new Error("Input length must be even");
        }

        const splited = [];

        for (let i = 0; i < l; i++) {
            if ((i & 1) === 0) {
                splited.push("%");
            }
            splited.push(utfs[i]);
        }

        try {
            return decodeURIComponent(splited.join(""));
        } catch (e) {
            throw new Error("Error during decoding: " + e.message);
        }
    }

    /**
     * Converts duodecimal array to hex string
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
        return hex.map(v => v.toString(16).toUpperCase()).join("");
    }

    /**
     * Values decoding
     */
    valuesDecode(encoded, values) {
        const duo = [];

        for (const c of encoded) {
            const i = values.indexOf(c);
            if (i !== -1 && (i & 1) === 0) {
                // i is even
                duo.push(i >> 1);
            }
        }

        const hexs = this.duo2hex(duo);

        if ((hexs.length & 1) !== 0) {
            throw new Error("Decoded hex length must be even");
        }

        return this.utf82str(hexs);
    }
}

export default CoreValuesDecode;

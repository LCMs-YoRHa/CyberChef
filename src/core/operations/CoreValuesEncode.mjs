/**
 * @author LCMs-YoRHa [Tlbxgi@outlook.com]
 * @copyright Crown Copyright 2025
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Core Values Encode operation
 */
class CoreValuesEncode extends Operation {
    /**
     * CoreValuesEncode constructor
     */
    constructor() {
        super();

        this.name = "Core Values Encode";
        this.module = "Default";
        this.description = "Encodes text to Core Socialist Values characters using a specific encoding algorithm.";
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
        const values = '富强民主文明和谐自由平等公正法治爱国敬业诚信友善';
        
        return this.valuesEncode(input, values);
    }
    
    /**
     * Converts string to UTF-8 hex representation
     */
    str2utf8(str) {
        const notEncoded = /[A-Za-z0-9\-\_\.\!\~\*\'\(\)]/g;
        const str1 = str.replace(notEncoded, c => c.codePointAt(0).toString(16));
        let str2 = encodeURIComponent(str1);
        const concated = str2.replace(/%/g, '').toUpperCase();
        return concated;
    }
    
    /**
     * Generates random binary value
     */
    randBin() {
        return Math.random() >= 0.5;
    }
    
    /**
     * Converts hex to duodecimal array
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
     * Converts duodecimal array to values string
     */
    duo2values(duo, values) {
        return duo.map(d => values[2*d] + values[2*d+1]).join('');
    }
    
    /**
     * Values encoding
     */
    valuesEncode(str, values) {
        return this.duo2values(this.hex2duo(this.str2utf8(str)), values);
    }
}

export default CoreValuesEncode;
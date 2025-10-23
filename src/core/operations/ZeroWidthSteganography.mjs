/**
 * @author LCMs-YoRHa [Tlbxgi@outlook.com]
 * @copyright Crown Copyright 2025
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";

/**
 * Zero Width Steganography operation
 */
class ZeroWidthSteganography extends Operation {
    /**
     * ZeroWidthSteganography constructor
     */
    constructor() {
        super();

        this.name = "Zero Width Steganography";
        this.module = "Default";
        this.description = "Encodes or decodes hidden text using zero-width Unicode characters.";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Mode",
                type: "option",
                value: ["Encode", "Decode"]
            },
            {
                name: "Carrier Text",
                type: "string",
                value: "",
                hint: "Only needed for encoding"
            }
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    run(input, args) {
        const [mode, carrierText] = args;
        
        if (mode === "Encode") {
            if (!carrierText) {
                throw new Error("Carrier text is required for encoding");
            }
            return this.encodeText(carrierText, input);
        } else {
            const result = this.decodeText(input);
            return result.hiddenText;
        }
    }
    
    /**
     * Initializes zero-width characters
     */
    initChars() {
        // Zero-width Unicode characters
        this.chars = ['\u200c', '\u200d', '\u202c', '\ufeff'];
        this.radix = this.chars.length;
        this.codelengthText = Math.ceil(Math.log(65536) / Math.log(this.radix));
    }
    
    /**
     * Encodes text into zero-width characters
     */
    encode_to_zerowidth_characters_text(str1) {
        this.initChars();
        
        const result = new Array(str1.length);
        let base = '';
        
        // Create base string with zeros
        for (let i = 0; i < this.codelengthText; i++) {
            base += '0';
        }
        
        for (let i = 0; i < str1.length; i++) {
            const c = str1.charCodeAt(i);
            const d = c.toString(this.radix);
            
            result[i] = (base + d).substr(-this.codelengthText);
        }
        
        let r = result.join('');
        
        // Replace digits with zero-width characters
        for (let i = 0; i < this.radix; i++) {
            r = r.replace(new RegExp(i, 'g'), this.chars[i]);
        }
        
        return r;
    }
    
    /**
     * Combines carrier text with hidden zero-width characters
     */
    combine_shuffle_string(str1, str2) {
        const result = [];
        
        // Split carrier text into chunks
        const chunks = str1.split(/([\u0000-\u002F\u003A-\u0040\u005b-\u0060\u007b-\u007f])|([\u0030-\u0039]+)|([\u0041-\u005a\u0061-\u007a]+)|([\u0080-\u00FF]+)|([\u0100-\u017F]+)|([\u0180-\u024F]+)|([\u0250-\u02AF]+)|([\u02B0-\u02FF]+)|([\u0300-\u036F]+)|([\u0370-\u03FF]+)|([\u0400-\u04FF]+)|([\u0500-\u052F]+)|([\u0530-\u058F]+)|([\u0590-\u05FF]+)|([\u0600-\u06FF]+)|([\u0700-\u074F]+)|([\u0750-\u077F]+)|([\u0780-\u07BF]+)|([\u07C0-\u07FF]+)|([\u0800-\u083F]+)|([\u0840-\u085F]+)|([\u08A0-\u08FF]+)|([\u0900-\u097F]+)|([\u0980-\u09FF]+)|([\u0A00-\u0A7F]+)|([\u0A80-\u0AFF]+)|([\u0B00-\u0B7F]+)|([\u0B80-\u0BFF]+)|([\u0C00-\u0C7F]+)|([\u0C80-\u0CFF]+)|([\u0D00-\u0D7F]+)|([\u0D80-\u0DFF]+)|([\u0E00-\u0E7F]+)|([\u0E80-\u0EFF]+)|([\u0F00-\u0FFF]+)|([\u1000-\u109F]+)|([\u10A0-\u10FF]+)|([\u1100-\u11FF]+)|([\u1200-\u137F]+)|([\u1380-\u139F]+)|([\u13A0-\u13FF]+)|([\u1400-\u167F]+)|([\u1680-\u169F]+)|([\u16A0-\u16FF]+)|([\u1700-\u171F]+)|([\u1720-\u173F]+)|([\u1740-\u175F]+)|([\u1760-\u177F]+)|([\u1780-\u17FF]+)|([\u1800-\u18AF]+)|([\u18B0-\u18FF]+)|([\u1900-\u194F]+)|([\u1950-\u197F]+)|([\u1980-\u19DF]+)|([\u19E0-\u19FF]+)|([\u1A00-\u1A1F]+)|([\u1A20-\u1AAF]+)|([\u1AB0-\u1AFF]+)|([\u1B00-\u1B7F]+)|([\u1B80-\u1BBF]+)|([\u1BC0-\u1BFF]+)|([\u1C00-\u1C4F]+)|([\u1C50-\u1C7F]+)|([\u1CC0-\u1CCF]+)|([\u1CD0-\u1CF0]+)/)
        
        // Interleave hidden text with carrier text chunks
        const textlen = chunks.length;
        const hiddentextlen = str2.length;
        
        if (textlen === 0) return str2;
        if (hiddentextlen === 0) return str1;
        
        const step = Math.max(1, Math.floor(textlen / hiddentextlen));
        
        let j = 0;
        for (let i = 0; i < textlen; i++) {
            if (chunks[i]) {
                result.push(chunks[i]);
                if (j < hiddentextlen && i % step === 0) {
                    result.push(str2[j]);
                    j++;
                }
            }
        }
        
        // Add remaining hidden characters
        while (j < hiddentextlen) {
            result.push(str2[j]);
            j++;
        }
        
        return result.join('');
    }
    
    /**
     * Splits text to extract hidden zero-width characters
     */
    split_zerowidth_characters(text) {
        this.initChars();
        
        const hiddenText = [];
        const originalText = [];
        
        for (let i = 0; i < text.length; i++) {
            const c = text.charAt(i);
            if (this.chars.includes(c)) {
                hiddenText.push(c);
            } else {
                originalText.push(c);
            }
        }
        
        return {
            originalText: originalText.join(''),
            hiddenText: hiddenText.join('')
        };
    }
    
    /**
     * Decodes from zero-width characters
     */
    decode_from_zero_width_characters_text(hiddenText, codelength) {
        this.initChars();
        
        // Replace zero-width characters with digits
        let text = hiddenText;
        for (let i = 0; i < this.radix; i++) {
            const regex = new RegExp(this.chars[i], 'g');
            text = text.replace(regex, i);
        }
        
        const result = [];
        const len = text.length;
        
        for (let i = 0; i < len; i += codelength) {
            const code = text.substr(i, codelength);
            if (code.length === codelength) {
                const charCode = parseInt(code, this.radix);
                result.push(String.fromCharCode(charCode));
            }
        }
        
        return result.join('');
    }
    
    /**
     * Main encode function
     */
    encodeText(originalText, hiddenText) {
        const zeroWidthText = this.encode_to_zerowidth_characters_text(hiddenText);
        return this.combine_shuffle_string(originalText, zeroWidthText);
    }
    
    /**
     * Main decode function
     */
    decodeText(text) {
        const splitted = this.split_zerowidth_characters(text);
        
        return {
            'originalText': splitted.originalText,
            'hiddenText': this.decode_from_zero_width_characters_text(splitted.hiddenText, this.codelengthText)
        };
    }
}

export default ZeroWidthSteganography;
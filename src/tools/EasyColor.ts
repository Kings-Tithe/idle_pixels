/**
 * Written by Zachary Kingcade 04/14/2020
 * Implements methods for handling color values in both Phaser and any cs based application.
 */
export class EasyColor {

    //Easy Color Varibles

    //basic colors
    static Red = 0xFF0000;
    static Orange = 0xFFA500;
    static Yellow = 0xFFFF00;
    static Spring = 0x00FF7F;
    static Green = 0x008000;
    static Teal = 0x008080;
    static Cyan = 0x00FFFF;
    static Azure = 0x00BFFF;
    static Blue = 0x0000FF;
    static Violet = 0xC71585;
    static Magenta = 0xFF00FF;
    static Pink = 0xFF69B4;
    static White = 0xFFFFFF;
    static Black = 0x000000;

    //light colors
    static light_Red = 0xFA8072;
    static light_Orange = 0xFF7F50;
    static light_Yellow = 0xFFFFE0;
    static light_Spring = 0x9ACD32;
    static light_Green = 0x3CB371;
    static light_Teal = 0x20B2AA;
    static light_Cyan = 0xE0FFFF;
    static light_Azure = 0x87CEFA;
    static light_Blue = 0x4169E1;
    static light_Violet = 0xDB7093;
    static light_Magenta = 0xEE82EE;
    static light_Pink = 0xFFB6C1;

    //dark colors
    static dark_Red = 0x8B0000;
    static dark_Orange = 0xFF8C00;
    static dark_Yellow = 0xFFD700;
    static dark_Spring = 0x3CB371;
    static dark_Green = 0x006400;
    static dark_Teal = 0x008B8B;
    static dark_Cyan = 0x008B8B;
    static dark_Azure = 0x1E90FF;
    static dark_Blue = 0x00008B;
    static dark_Violet = 0xBA55D3;
    static dark_Magenta = 0x9400D3;
    static dark_Pink = 0xFF1493;

    /**
     * Calculates the hexadecimal value given an rgb value set
     * @param {number} redValue value between 0 and 255 to represent red
     * @param {number} greenValue value between 0 and 255 to represent green
     * @param {number} blueValue value between 0 and 255 to represent blue
     * @returns {Hex Number} A string version of the hex value of the combined rgb numbers
     */
    static toHex(redValue: number,greenValue: number, blueValue: number) {
        //string to combine other values at the end and return
        let combinedString: string = "0x";
        //put numbers in an array for processing
        let numbers: number[];
        numbers = [redValue,greenValue,blueValue];
        //stores the string version of the numbers tweeked
        let strings: string[];
        strings = ["","",""];

        //make sure all numbers are in the range of 0 to 255,
        //convert them to string representation of hex,
        //make sure they are to 2 place values
        for (let i = 0; i < numbers.length; i++){
            //between 0 and 255 or set to max/min
            if (numbers[i] > 255){
                numbers[i] = 255;
            } 
            if (numbers[i] < 0){
                numbers[i] = 0;
            }
            //convert to string hex
            strings[i] = numbers[i].toString(16);

            //make sure to 2 place values
            if(strings[i].length != 2){
                strings[i] = '0' + strings[i];
            }

            //append to combinedString, is stored in strings first form processing
            combinedString += strings[i];
        }

        return Number(combinedString);
        //return combinedString.toString(16);
    }

    /**
     * Calculates the rgb value given a hexadecimal value
     * @param {string} hexValue hex number
     * @returns {number[]} A array of 3 numbers representing red green and blue in that order
     */
    static toRGB(hexValue: number){
        //holds the string version of hex values
        let strings: string[];
        strings = ["","",""];
        //number put in string form so we can tear it apart by rgb, set to 6 value places
        let hexString = hexValue.toString(16);
        while (hexString.length < 6){
            hexString = '0' + hexString;
        }
        //hold the base 10 number values of the rgb of the hex number
        let numbers: number[];
        numbers = [0,0,0];
        //first grab individual hex values for rgb
        for (let i = 0; i < 3; i++){
            strings[i] += hexString[(i*2)];
            strings[i] += hexString[(i*2) + 1];
        }
        //convert them to numbers and add them to the array
        for (let i = 0; i < 3; i++){
            numbers[i] = Number("0x" + strings[i]);
        }

        return numbers;
    }

    static percentTransform(fromHex: number, toHex: number, percentage: number){
        //make sure percentage is within range 0 to 100
        if (percentage > 100){
            percentage = 100;
        } 
        if (percentage < 0){
            percentage = 0;
        }
        //check if a whole number of decimal fraction
        if(percentage > 1){
            percentage = percentage/100;
        }

        let fromRGB = this.toRGB(fromHex);
        let toRGB = this.toRGB(toHex);
        let resultHex: string = "0x";

        for (let i = 0; i < fromRGB.length; i++){
            let resultNumberByPercent = toRGB[i] + ((fromRGB[i] - toRGB[i]) * percentage);
            //between 0 and 255 or set to max/min
            if (resultNumberByPercent > 255){
                resultNumberByPercent = 255;
            } 
            if (resultNumberByPercent < 0){
                resultNumberByPercent = 0;
            }

            //make sure the number is an int
            resultNumberByPercent = parseInt(resultNumberByPercent.toString());
            //convert to string hex
            let checkString = resultNumberByPercent.toString(16);
            //make sure to 2 place values
            if(checkString.length != 2){
                checkString = '0' + checkString;
            }

            //append to resulting hex string, stored as string first for processing
            resultHex += checkString;
        }

        return Number(resultHex);
    }

}
/**
 * Implements methods for getting random data of various forms. Streamlines the
 * use of Math.random()
 */
export class Rnd {

    /**
     * Calculates a zero or one randomly and converts it to a boolean.
     * @param none
     * @return {Boolean}
     */
    static bool() {
        let bit = Math.floor(Math.random() * 2);
        return Boolean(bit);
    }

    /**
     * Calculates a random integer value within a given range.
     * @param {Number} min smallest integer to return
     * @param {Number} max maximum integer to return
     * @return {Number} integer x: min <= x <= max
     */
    static int(min, max) {
        return Math.floor(Math.random() * ((max + 1) - min)) + min;
    }

}
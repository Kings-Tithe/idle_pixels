class PercentCoords {

    static x(percentage) {
        return percentage / 100 * IdlePixels.scale.width;
    }

    static y(percentage) {
        return percentage / 100 * IdlePixels.scale.height;
    }

}
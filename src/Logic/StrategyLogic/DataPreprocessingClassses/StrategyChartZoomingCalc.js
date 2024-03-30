export class StrategyChartZoomingCalc {
    static GetLimitsOfZooming(candles) {
        const datePoints = candles.slice().map(candle => candle.x);

        const minDate = Math.min(...datePoints);
        const maxDate = Math.max(...datePoints);

        const range = maxDate - minDate;
        const zoomRange = range / datePoints.length;

        return {
            x: {
                minRange: zoomRange,
                min: minDate - zoomRange,
                max: maxDate + zoomRange
            }
        }
    }


}
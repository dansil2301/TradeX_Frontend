export class StrategyChartZoomingCalc {
    static GetLimitsOfZooming(candles, candlesToDisplay) {
        const datePoints = candles.slice(-candlesToDisplay).map(candle => candle.x);

        const minDate = Math.min(...datePoints);
        const maxDate = Math.max(...datePoints);

        const range = maxDate - minDate;
        const zoomRange = range / 5;

        return {
            x: {
                minRange: zoomRange,
                min: minDate - zoomRange,
                max: maxDate + zoomRange
            }
        }
    }
}
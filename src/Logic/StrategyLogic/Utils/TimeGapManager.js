export class TimeGapManager {
    calculateTimeGap(data) {
        let timeInterval = null;
        for (let i = 1; i < data.length; i++) {
            const currentTime = data[i].x;
            const prevTime = data[i - 1].x;
            const currentInterval = currentTime - prevTime;
            if (timeInterval === null || currentInterval < timeInterval) {
                timeInterval = currentInterval;
            }
        }
        return timeInterval;
    }

    fillDataPoint(data, time, currentIndex) {
        const nullDataPoint = { x: time };
        Object.keys(data[currentIndex - 1]).forEach(key => {
            if (key !== 'x') {
                nullDataPoint[key] = null;
            }
        });
        return nullDataPoint;
    }

    fillGapsWithNull(dataset) {
        const data = dataset.data;

        let timeInterval = this.calculateTimeGap(data);

        const filledData = [];
        let currentIndex = 0;

        for (let time = data[0].x; time <= data[data.length - 1].x; time += timeInterval) {
            const currentDataPoint = data[currentIndex];
            if (currentDataPoint && currentDataPoint.x === time) {
                filledData.push(currentDataPoint);
                currentIndex++;
            } else {
                filledData.push(this.fillDataPoint(data, time, currentIndex));
            }
        }

        dataset.data = filledData;

        return dataset;
    }

    removeNullDataPoints(dataset) {
        dataset.data = dataset.data.filter(dataPoint => {
            return Object.keys(dataPoint).some(key => key !== 'x' && dataPoint[key] !== null);
        });

        return dataset;
    }
}
export class StatisticsDatasetManager{
    formatData(data) {
        const formattedData = data.map(item => ({
            x: item.visitedAt,
            y: item.tradersVisited
        }));
        return formattedData;
    }
}
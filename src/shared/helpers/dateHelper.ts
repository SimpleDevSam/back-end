export class DateHelper {

    static getFormattedDate(daysAgo:number): string {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString().split('T')[0];
    }
}

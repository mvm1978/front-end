export class Utils
{

    //**************************************************************************

    public static getFormattedRating(value: number): string
    {
        if (value < Math.pow(10, 3)) {
            return value.toString();
        } else if (value < Math.pow(10, 6)) {
            return Math.round((value / Math.pow(10, 3)) * 10 ) / 10 + ' K';
        } else if (value < Math.pow(10, 9)) {
            return Math.round((value / Math.pow(10, 6)) * 10 ) / 10 + ' M';
        } else if (value < Math.pow(10, 12)) {
            return Math.round((value / Math.pow(10, 9)) * 10 ) / 10 + ' B';
        } else {
            return value.toString();
        }
    }

    //**************************************************************************

}
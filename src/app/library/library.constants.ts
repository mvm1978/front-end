import {Constants} from '../common/core/constants';

export class LibraryConstants
{
    public static get APP(): string {
        return 'library';
    }

    //**************************************************************************

    public static get BOOK_UPLOAD_PATH(): string {
        return Constants.LIBRARY_PATH + 'book-upload/';
    }

    //**************************************************************************

    public static get AUTHOR_PATH(): string {
        return Constants.LIBRARY_PATH + 'author/';
    }

    //**************************************************************************

    public static get REPORTS_PATH(): string {
        return Constants.LIBRARY_PATH + 'reports/';
    }

    //**************************************************************************

}
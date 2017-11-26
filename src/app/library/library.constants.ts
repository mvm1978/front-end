import {Constants} from '../common/core/constants';

export class LibraryConstants
{
    public static get APP(): string {
        return 'library';
    }

    //**************************************************************************

    public static get BOOK_PATH(): string {
        return Constants.LIBRARY_PATH + 'book/';
    }

    //**************************************************************************

    public static get GENRE_PATH(): string {
        return Constants.LIBRARY_PATH + 'genre/';
    }

    //**************************************************************************

    public static get AUTHOR_PATH(): string {
        return Constants.LIBRARY_PATH + 'author/';
    }

    //**************************************************************************

}
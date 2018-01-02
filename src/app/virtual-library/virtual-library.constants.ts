import {Constants} from '../common/core/constants';

export class VirtualLibraryConstants
{
    public static get APP(): string {
        return 'virtual-library';
    }

    //**************************************************************************

    public static get LIBRARY_PATH(): string {
        return Constants.VIRTUAL_LIBRARY_PATH + 'library/';
    }

    //**************************************************************************

    public static get BOOK_PATH(): string {
        return Constants.VIRTUAL_LIBRARY_PATH + 'book/';
    }

    //**************************************************************************

    public static get GENRE_PATH(): string {
        return Constants.VIRTUAL_LIBRARY_PATH + 'genre/';
    }

    //**************************************************************************

    public static get AUTHOR_PATH(): string {
        return Constants.VIRTUAL_LIBRARY_PATH + 'author/';
    }

    //**************************************************************************

}
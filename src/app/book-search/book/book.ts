export class Book {
    private _title: string;
    private _author: string;
    private _isbn: string;
    private _isbn13: string;
    private _description: string;
    private _image_url: string;
    private _avg_rating: number;
    private _num_pages: number;
    private _publisher: string;
    private _gr_url: string;

    constructor (title: string, author: string, isbn: string, isbn13: string, description: string, image_url: string, avg_rating: number, num_pages: number, publisher: string, gr_url: string) {
        this._title = title;
        this._author = author;
        this._isbn = isbn;
        this._isbn13 = isbn13;
        this._description = description;
        this._image_url = image_url;
        this._avg_rating = avg_rating;
        this._num_pages = num_pages;
        this._publisher = publisher;
        this._gr_url = gr_url;
    }

    get title():string {
        return this._title;
    }

    get author():string {
        return this._author;
    }

    get isbn():string {
        return this._isbn;
    }

    get isbn13():string {
        return this._isbn13;
    }

    get description():string {
        return this._description;
    }

    get image_url():string {
        return this._image_url;
    }

    get avg_rating():number {
        return this._avg_rating;
    }

    get num_pages():number {
        return this._num_pages;
    }

    get publisher():string {
        return this._publisher;
    }

    get gr_url():string {
        return this._gr_url;
    }

}
// eslint-disable-next-line node/no-unpublished-import
import {Chance} from 'chance';
import {BookData} from '../models/request/book.post.request.model';

class BookHelper {
  private static chance = new Chance();

  /**
   * Generates an invalid integer for an isbn
   * @returns a valid isbn number
   */
  public static generateInvalidIsbn = () => {
    return this.chance
      .integer({min: 100000000000, max: 999999999999})
      .toString();
  };

  /**
   * Generates valid book data
   * @param isbn a valid isbn number
   * @param language a valid language
   * @returns an object off type BookData
   */
  public static randomBookData = (
    isbn: string,
    language = 'English'
  ): BookData => {
    return {
      isbn: isbn,
      title: this.chance.name(),
      author: `${this.chance.first()} ${this.chance.last()}`,
      pages: this.chance.integer({min: 1, max: 2000}),
      year: +this.chance.year(),
      language: language,
    };
  };
}

export default BookHelper;

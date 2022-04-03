import {AxiosResponse} from 'axios';
import BookHelper from '../generators/bookGenerator';
import AxiosHelper from '../helpers/axiosClient.helper';
import {BookResponseData} from '../models/response/book.post.response.model';
import {ErrorResponse} from '../models/response/error.response.model';

describe('PUT /books/', () => {
  describe('Success Flows', () => {
    const isbn = '978-7-6897-3875-2';
    beforeAll(async () => {
      try {
        const bookData = BookHelper.randomBookData(isbn);
        const {status}: AxiosResponse<BookResponseData> =
          await AxiosHelper.post<BookResponseData>('books', bookData);
        expect(status).toBe(201);
      } catch (e: unknown) {
        const error = e as ErrorResponse;
        console.log(`FAILED IN BEFORE ALL: ${error.message}`);
        throw e;
      }
    });

    /**
     * GIVEN a user has valid book data
     * WHEN they send the data to PUT /books/isbn
     * THEN the book is updated
     */
    //TODO: Report Bug why this test is failing
    it('Should return a 204 UPDATED response when a valid body is provided', async () => {
      const bookData = BookHelper.randomBookData(isbn);

      const {status}: AxiosResponse<BookResponseData> =
        await AxiosHelper.put<BookResponseData>(`books/${isbn}`, bookData);
      expect(status).toBe(204);
    }, 10000); // Increase timeout due to multiple
  });
});

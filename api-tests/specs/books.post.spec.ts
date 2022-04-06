import {AxiosResponse} from 'axios';
import BookHelper from '../generators/bookGenerator';
import AxiosHelper from '../helpers/axiosClient.helper';
import {BookResponseData} from '../models/response/book.post.response.model';
import {ErrorResponse} from '../models/response/error.response.model';

describe('POST /books/', () => {
  describe('Success Flows', () => {
    const isbn = '9781377187150';
    const {randomBookData} = BookHelper;
    const bookData = randomBookData(isbn);
    /**
     * GIVEN a user has valid book data
     * WHEN they send the data to POST /books
     * THEN the book is created
     */
    it('Should return a 201 CREATED response when a valid body is provided', async () => {
      const {data, status}: AxiosResponse<BookResponseData> =
        await AxiosHelper.post<BookResponseData>('books', bookData);
      expect(status).toBe(201);
      expect(data.status).toBe(`Book ${isbn} created`);
    });

    /**
     * GIVEN a user has valid book data
     * WHEN they send the data to POST /books
     * THEN the book is created
     */
    it('Should create multiple', async () => {
      const isbn1 = '9782767138554';
      const isbn2 = '9782311108507';
      const isbn3 = '9786026340986';
      const [responseOne, responseTwo, responseThree] = await Promise.all([
        AxiosHelper.post<BookResponseData>('books', randomBookData(isbn1)),
        AxiosHelper.post<BookResponseData>('books', randomBookData(isbn2)),
        AxiosHelper.post<BookResponseData>('books', randomBookData(isbn3)),
      ]);
      expect(responseOne.status).toBe(201);
      expect(responseTwo.status).toBe(201);
      expect(responseThree.status).toBe(201);
    });
  });

  describe('Failure Flows', () => {
    const isbn = BookHelper.generateInvalidIsbn();
    const bookData = BookHelper.randomBookData(isbn);
    /**
     * GIVEN a user has valid book data
     * WHEN they send the data to POST /books
     * AND the isbn is invalid
     * THEN a 406 error is returned
     */
    it('Should return a 406 error when an invalid isbn in provided', async () => {
      expect.assertions(3);
      try {
        await AxiosHelper.post<BookResponseData>('books', bookData);
      } catch (e: unknown) {
        const error = e as ErrorResponse;
        expect(error.response.status).toBe(406);
        expect(error.response.data).toStrictEqual({
          error: `Invalid ISBN: ${isbn}`,
        });
        expect(error.message).toBe('Request failed with status code 406');
      }
    });
  });
});

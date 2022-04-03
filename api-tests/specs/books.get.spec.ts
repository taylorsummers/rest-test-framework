import {AxiosResponse} from 'axios';
// eslint-disable-next-line node/no-unpublished-import
import {Chance} from 'chance';
import {AUTHORS_LIST} from '../constants/Authors';
import {LANGUAGE_LIST} from '../constants/Languages';
import {LEAVES_OF_GRASS} from '../constants/Books';
import {BooksList} from '../models/response/booksList.get.response.model';
import {ErrorResponse} from '../models/response/error.response.model';
import AxiosHelper from '../helpers/axiosClient.helper';

const chance = new Chance();

describe('GET /books/', () => {
  describe('Success Flows', () => {
    /**
     * GIVEN data exists in Firestore
     * WHEN a request is made to GET /books
     * THEN a list of book data is returned
     */
    it('Should return a 200 OK and a json object of books', async () => {
      const {data, status}: AxiosResponse<BooksList> =
        await AxiosHelper.get<BooksList>('books');
      expect(status).toBe(200);
      expect(data.length).toBeGreaterThanOrEqual(1);
      expect(data[0].author).toBeDefined();
      expect(data[0].isbn).toBeDefined();
      expect(data[0].language).toBeDefined();
      expect(data[0].pages).toBeDefined();
      expect(data[0].title).toBeDefined();
      expect(data[0].year).toBeDefined();
    });

    /**
     * GIVEN data exists in Firestore
     * WHEN a request is made to GET /books
     * AND a langauge parameter is provided
     * THEN a list of book data is returned
     * AND the list is filtered by language
     */
    it('Should return a 200 OK and a json object of books filtered by language', async () => {
      const params = {language: LANGUAGE_LIST.English};
      const {data, status}: AxiosResponse<BooksList> =
        await AxiosHelper.get<BooksList>('books', params);
      expect(status).toBe(200);
      expect(data.length).toBeGreaterThanOrEqual(1);
      expect(data[0].language).toBe(LANGUAGE_LIST.English);
    });

    /**
     * GIVEN data exists in Firestore
     * WHEN a request is made to GET /books
     * AND a langauge parameter is provided
     * THEN a list of book data is returned
     * AND the list is filtered by author
     */
    it('Should return a 200 OK and a json object of books filtered by author', async () => {
      const params = {author: AUTHORS_LIST.WilliamShakespeare};
      const {data, status}: AxiosResponse<BooksList> =
        await AxiosHelper.get<BooksList>('books', params);
      expect(status).toBe(200);
      expect(data.length).toBeGreaterThanOrEqual(1);
      expect(data[0].author).toBe(AUTHORS_LIST.WilliamShakespeare);
    });

    /**
     * GIVEN data exists in Firestore
     * WHEN a request is made to GET /books
     * AND a langauge parameter is provided
     * AND the language is invalid
     * THEN an empty list is returned
     */
    it('Should return a 200 OK and a json object of books filtered by language', async () => {
      const params = {language: chance.word()};
      const {data, status}: AxiosResponse<BooksList> =
        await AxiosHelper.get<BooksList>('books', params);
      expect(status).toBe(200);
      expect(data).toStrictEqual([]);
    });

    /**
     * GIVEN data exists in Firestore
     * WHEN a request is made to GET /books/ibn
     * AND a valid ibn value is provided
     * THEN the book with that ibn should be returned
     */
    it('Should return a 200 OK and a json object of the book', async () => {
      const ibn = '9780451504562';
      const {data, status}: AxiosResponse<BooksList> =
        await AxiosHelper.get<BooksList>(`books/${ibn}`);
      expect(status).toBe(200);
      expect(data).toStrictEqual(LEAVES_OF_GRASS);
    });
  });

  describe('Failure Flows', () => {
    /**
     * GIVEN data exists in Firestore
     * WHEN a request is made to GET /books/ibn
     * AND an invalid ibn value is provided
     * THEN a 406 error code should be returned
     */
    it('Should return a 406 error code', async () => {
      expect.assertions(3);
      const ibn = chance.integer({min: 1, max: 1000});
      try {
        await AxiosHelper.get<BooksList>(`books/${ibn}`);
      } catch (e: unknown) {
        const error = e as ErrorResponse;
        expect(error.response.status).toBe(406);
        expect(error.response.data).toStrictEqual({
          error: `Invalid ISBN: ${ibn}`,
        });
        expect(error.message).toBe('Request failed with status code 406');
      }
    });
  });
});

import {AxiosResponse} from 'axios';
import AxiosHelper from '../helpers/axiosClient.helper';
import FirestoreHelper from '../helpers/firestore.helper';
import {BooksList} from '../models/response/booksList.get.response.model';

describe('PUT /books/', () => {
  describe('Success Flows', () => {
    const isbn = '9787689738752';
    const firestore = new FirestoreHelper();
    beforeAll(async () => {
      await firestore.addBookData(isbn);
    });


    //TODO Figure out why this is failing. The data exists in Firestore.
    it('Get new book from Firestore', async () => {
      const {status}: AxiosResponse<BooksList> =
        await AxiosHelper.get<BooksList>(`books/${isbn}`);
      expect(status).toBe(200);
    });
  });
});

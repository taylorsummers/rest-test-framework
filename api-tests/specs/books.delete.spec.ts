import {AxiosResponse} from 'axios';
import AxiosHelper from '../helpers/axiosClient.helper';
import FirestoreHelper from '../helpers/firestore.helper';
import {BookResponseData} from '../models/response/book.post.response.model';

describe('DELETE /books/isbn', () => {
  describe('Success Flows', () => {
    const isbn = '9788338003412';
    const firestore = new FirestoreHelper();

    beforeAll(async () => {
      await firestore.addBookData(isbn, 'English', true);
    });

    it('Should respoond with ', async () => {
      const {status}: AxiosResponse<BookResponseData> =
        await AxiosHelper.delete<BookResponseData>(`books/${isbn}`);
      expect(status).toBe(204);
    });
  });
});

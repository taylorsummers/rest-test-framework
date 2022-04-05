import {AxiosResponse} from 'axios';
import ApiGatewayHelper from '../helpers/apiGateway.helper';
import AxiosHelper from '../helpers/axiosClient.helper';
import FirestoreHelper from '../helpers/firestore.helper';
import {APIList} from '../models/misc/apiGateway.list.model';
import {BookResponse} from '../models/response/book.get.response.model';

describe('Using GCP helpers to access GCP data', () => {
  describe('Success Flows', () => {
    const isbn = '9787689738752';
    const firestore = new FirestoreHelper();
    const apiGateway = new ApiGatewayHelper();

    beforeAll(async () => {
      await firestore.addBookData(isbn);
    });

    it('Get new book from Firestore', async () => {
      const {data, status}: AxiosResponse<BookResponse> =
        await AxiosHelper.get<BookResponse>(`books/${isbn}/`);
      expect(status).toBe(200);
      expect(data.author).toBeDefined();
      expect(data.isbn).toBe(isbn);
      expect(data.language).toBeDefined();
      expect(data.pages).toBeDefined();
      expect(data.title).toBeDefined();
      expect(data.year).toBeDefined();
    });

    it('Should have an API via api-gateway', async () => {
      const apiList: APIList = (await apiGateway.listApis()) as APIList;
      expect(apiList).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            displayName: 'books',
            state: 'ACTIVE',
          }),
        ])
      );
    });
  });
});

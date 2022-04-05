import {AxiosResponse} from 'axios';
import ApiGatewayHelper from '../helpers/apiGateway.helper';
import AxiosHelper from '../helpers/axiosClient.helper';
import FirestoreHelper from '../helpers/firestore.helper';
import {APIList} from '../models/misc/apiGateway.list.model';
import {BooksList} from '../models/response/booksList.get.response.model';

describe('Using GCP helpers to access GCP data', () => {
  describe('Success Flows', () => {
    const isbn = '9787689738752';
    const firestore = new FirestoreHelper();
    const apiGateway = new ApiGatewayHelper();

    beforeAll(async () => {
      await firestore.addBookData(isbn);
    });

    //TODO Figure out why this is failing. The data exists in Firestore.
    it('Get new book from Firestore', async () => {
      const {status}: AxiosResponse<BooksList> =
        await AxiosHelper.get<BooksList>(`books/${isbn}/`);
      expect(status).toBe(200);
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

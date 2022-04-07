import {AxiosResponse} from 'axios';
import ApiGatewayHelper from '../helpers/apiGateway.helper';
import AxiosHelper from '../helpers/axiosClient.helper';
import FirestoreHelper from '../helpers/firestore.helper';
import {poll} from '../helpers/misc.helper';
import {APIList} from '../models/misc/apiGateway.list.model';
import {BookResponse} from '../models/response/book.get.response.model';

const axiosValidateFailure = (status: any) => {
  return status < 500;
};

describe('Using GCP helpers to access GCP data', () => {
  describe('Success Flows', () => {
    const isbn = '9787689738752';
    const firestore = new FirestoreHelper();
    const apiGateway = new ApiGatewayHelper();

    beforeAll(async () => {
      await firestore.addBookData(isbn);
    });

    it('Get new book from Firestore', async () => {
      const fn = () =>
        AxiosHelper.get<BookResponse>(
          `books/${isbn}/`,
          {},
          false,
          axiosValidateFailure
        );
      const fnCondition = (result: {status: number}) => result.status !== 200;
      const {data, status}: AxiosResponse<BookResponse> = await poll(
        fn,
        fnCondition,
        3000
      );

      expect(status).toBe(200);
      expect(data.author).toBeDefined();
      expect(data.isbn).toBe(isbn);
      expect(data.language).toBeDefined();
      expect(data.pages).toBeDefined();
      expect(data.title).toBeDefined();
      expect(data.year).toBeDefined();
    }, 10000);

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

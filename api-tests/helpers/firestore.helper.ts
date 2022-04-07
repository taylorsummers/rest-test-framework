// eslint-disable-next-line node/no-unpublished-import
import {Firestore, Timestamp} from '@google-cloud/firestore';
import {EnvConfig} from '../config/envConfig.model';
// eslint-disable-next-line node/no-unpublished-import
import {Chance} from 'chance';
import AxiosHelper from './axiosClient.helper';
import {BookResponse} from '../models/response/book.get.response.model';
import {poll} from './misc.helper';

class FirestoreHelper {
  private firestore = new Firestore();
  private static envConfig: EnvConfig = (process as any).envConfig;
  private firestoreName = FirestoreHelper.envConfig.firestoreCollection;
  private chance = new Chance();

  private axiosValidateFailure = (status: any) => {
    return status < 500;
  };

  private store = this.firestore.collection(this.firestoreName);

  public addBookData = async (
    isbn: string,
    language = 'English',
    _waitForBook = false
  ) => {
    const batch = this.firestore.batch();
    const doc = this.store.doc(isbn);

    batch.set(doc, {
      title: `TEST DATA ${this.chance.hammertime()}`,
      author: `${this.chance.first()} ${this.chance.last()}`,
      pages: this.chance.integer({min: 1, max: 2000}),
      year: +this.chance.year(),
      language: language,
      updated: Timestamp.now(),
    });

    try {
      await batch.commit();
      console.log('Saved books in Firestore');
      if (_waitForBook) {
        await this.waitForBook(isbn);
      }
    } catch (e) {
      console.error('Error saving books:', e);
      return;
    }
  };

  public waitForBook = async (isbn: string) => {
    const fn = () =>
      AxiosHelper.get<BookResponse>(
        `books/${isbn}/`,
        {},
        false,
        this.axiosValidateFailure
      );
    const fnCondition = (result: {status: number}) => result.status !== 200;
    return await poll(fn, fnCondition, 1000);
  };
}

export default FirestoreHelper;

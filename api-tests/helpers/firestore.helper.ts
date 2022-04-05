// eslint-disable-next-line node/no-unpublished-import
import {Firestore, Timestamp} from '@google-cloud/firestore';
import {EnvConfig} from '../config/envConfig.model';
// eslint-disable-next-line node/no-unpublished-import
import {Chance} from 'chance';

class FirestoreHelper {
  private firestore = new Firestore();
  private static envConfig: EnvConfig = (process as any).envConfig;
  private firestoreName = FirestoreHelper.envConfig.firestoreCollection;
  private chance = new Chance();

  private store = this.firestore.collection(this.firestoreName);

  public addBookData = async (isbn: string, language = 'English') => {
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
    } catch (e) {
      console.error('Error saving books:', e);
      return;
    }
  };
}

export default FirestoreHelper;

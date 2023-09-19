import { deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { getCollectionByName } from './firebase.utils';
import type { ProductData } from '../types/interfaces';

export const handleAddProduct = async (product: ProductData) => {
  try {
    const productsCollection = getCollectionByName('products');
    await setDoc(doc(productsCollection), product);
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}

export const handleFetchProducts = async () => {
  try {
    const productsCollection = getCollectionByName('products');
    const productsSnapshotArray = await getDocs(
      query(productsCollection, orderBy('createdDate'))
    );
    return productsSnapshotArray.docs.map((doc) => ({
      ...doc.data(),
      documentId: doc.id,
    }));
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}

export const handleDeleteProducts = async (documentId: string): Promise<void> => {
  try {
    const productsCollection = getCollectionByName('products');
    await deleteDoc(doc(productsCollection, documentId));
  } catch (err) {
    console.error(err);
  }
}

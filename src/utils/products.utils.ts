import { deleteDoc, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { getDocumentsByOrder, productsCollection } from './firebase.utils';
import type { ProductData } from '../types/interfaces';

export const handleAddProduct = async (product: ProductData) => {
  try {
    await setDoc(doc(productsCollection), product);
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}

export const handleFetchProducts = async () => {
  try {
    return (await getDocumentsByOrder('products', 'createdDate'))?.docs
      .map(({ data, id }) => ({
        ...data(),
        documentId: id,
      }));
  } catch (err) {
    console.error(err);
  }
}

export const handleDeleteProducts = async (documentId: string): Promise<void> => {
  try {
    await deleteDoc(doc(productsCollection, documentId));
  } catch (err) {
    console.error(err);
  }
}

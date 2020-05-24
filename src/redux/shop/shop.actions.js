import ShopActionTypes from "./shop.types.js";
import {
  firestore,
  convertCollectionSnapshottoMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTION_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
  payload: collectionsMap,
});
export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTION_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionref = firestore.collection("collections");
    dispatch(fetchCollectionsStart());
    collectionref
      .get()
      .then((snapshot) => {
        const collectionsMap = convertCollectionSnapshottoMap(snapshot);
        console.log("gf", collectionsMap);
        dispatch(fetchCollectionsSuccess(collectionsMap));
        //updateCollection(collectionsMap)
      })
      .catch((error) => {
        dispatch(fetchCollectionsFailure(error.errorMessage));
      });
  };
};

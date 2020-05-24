import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { HomePage } from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {
  auth,
  createUserProfileDocument,
  addCollectionandDocuments,
} from "./firebase/firebase.utils";
import "./App.css";
import { setCurrentUser } from "./redux/user/user.actions";

import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null,
  //   };
  // }
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;
    console.log("AB", collectionsArray);
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          // this.setState({
          //   currentUser: {
          //     id: snapshot.id,
          //     ...snapshot.data(),
          //   },
          // });

          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
        // addCollectionandDocuments(
        //   "collections",
        //   collectionsArray.map(({ title, items }) => ({ title, items }))
        // );
      } else {
        //this.setState({ currentUser: userAuth });
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user, shop }) => ({
  currentUser: user.currentUser,
  // collectionsArray: Object.keys(shop.collections).map(
  //   (key) => shop.collections[key]
  // ),
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

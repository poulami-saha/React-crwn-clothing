import React from "react";
import { Route } from "react-router-dom";
import CollectionOverview from "../../components/collections-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { isCollectionFetching } from "../../redux/shop/shop.selectors";
class ShopPage extends React.Component {
  unsubscribeFromSnapshop = null;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route path={`${match.path}/:categoryId`} component={CollectionPage} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: isCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);

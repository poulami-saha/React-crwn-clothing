import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PreviewCollection from "../../components/preview-collection/preview-collection.component";
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";
import "./collection-overview.styles.scss";

const CollectionOverview = ({ collections }) => {
  return (
    <div className="overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <PreviewCollection key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});
export default connect(mapStateToProps)(CollectionOverview);

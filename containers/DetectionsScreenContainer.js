import { connect } from "react-redux";
import { getDetections } from "../actions/detections";
import DetectionsScreen from "../screens/DetectionsScreen";

const mapStateToProps = (state) => ({
    detections: state.detections.get("detections"),
    loading: state.detections.get("loading"),
});

const mapDispatchToProps = (dispatch) => ({
    getDetections(offset = 0, limit = 10) {
        dispatch(getDetections(offset, limit));
    },
});

const DetectionsScreenContainer = connect(mapStateToProps, mapDispatchToProps)(DetectionsScreen);

export default DetectionsScreenContainer;

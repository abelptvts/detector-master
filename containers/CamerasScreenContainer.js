import { connect } from "react-redux";
import { deleteCamera, getCameras, toggleCamera } from "../actions/cameras";
import CamerasScreen from "../screens/CamerasScreen";

const mapStateToProps = (state) => ({
    cameras: state.cameras.get("cameras"),
    loading: state.cameras.get("loading"),
});

const mapDispatchToProps = (dispatch) => ({
    getCameras(offset = 0, limit = 10) {
        dispatch(getCameras(offset, limit));
    },
    toggleCamera(id, enabled) {
        dispatch(toggleCamera(id, enabled));
    },
    deleteCamera(id) {
        dispatch(deleteCamera(id));
    },
});

const CamerasScreenContainer = connect(mapStateToProps, mapDispatchToProps)(CamerasScreen);

export default CamerasScreenContainer;

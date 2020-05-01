import { connect } from "react-redux";
import { registerCamera } from "../actions/cameras";
import AddCameraScreen from "../components/AddCameraScreen";

const mapStateToProps = () => ({});

const mapDispathToProps = (dispatch, props) => ({
    async registerCamera(name, description = "") {
        await dispatch(registerCamera(name, description));
        props.navigation.pop();
    },
});

const AddCameraScreenContainer = connect(mapStateToProps, mapDispathToProps)(AddCameraScreen);

export default AddCameraScreenContainer;

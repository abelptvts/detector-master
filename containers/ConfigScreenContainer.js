import { connect } from "react-redux";
import { getHostname, setHostname } from "../actions/util";
import ConfigScreen from "../screens/ConfigScreen";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, { navigation }) => ({
    async saveHostname(hostname) {
        await dispatch(setHostname(hostname));
        navigation.replace("Your Cameras");
    },
    async getHostname() {
        return getHostname();
    },
});

const ConfigScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ConfigScreen);

export default ConfigScreenContainer;

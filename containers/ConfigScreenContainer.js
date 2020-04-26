import { connect } from "react-redux";
import { setHostname } from "../actions/util";
import ConfigScreen from "../screens/ConfigScreen";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, { navigation }) => ({
    async saveHostname(hostname) {
        await dispatch(setHostname(hostname));
        navigation.replace("Root");
    },
});

const ConfigScreenContainer = connect(mapStateToProps, mapDispatchToProps)(ConfigScreen);

export default ConfigScreenContainer;

import { connect } from "react-redux";
import RegisterScreen from "../screens/RegisterScreen";
import { register } from "../actions/masters";

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, { navigation }) => ({
    async register(name) {
        await dispatch(register(name));
        navigation.replace("Root");
    },
});

const RegisterScreenContainer = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

export default RegisterScreenContainer;

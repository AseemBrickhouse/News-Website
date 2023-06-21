import * as React from 'react';
// import * as actions from '../../store/actions/auth';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { styled } from "@material-ui/core/styles";
import ErrorTemplate from './ErrorTemplate';

const AuthError = (props) => {
    return(
        <div>
            <ErrorTemplate {...props}/>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        error: state.auth.error
    }
}
export default withRouter(connect(mapStateToProps, null)(AuthError));
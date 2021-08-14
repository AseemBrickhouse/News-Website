import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getaccount } from '../../actions/accounts';

export class Account extends Component {

    static propTypes = {
        account: PropTypes.array.isRequired
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    account: state.account.account
})

export default connect(mapStateToProps)(Account);
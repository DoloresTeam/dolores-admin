import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { switchActionCreator } from '../actions/SwitchActionCreator'

import FlatButton from 'material-ui/FlatButton';
import ActionSwitch from 'material-ui/svg-icons/action/swap-horiz';

class DoloresTitle extends React.Component {

    render() {
        let title = (this.props.isDepartment ? 'Department ' : 'Member ') + this.props.title
        return (
            <div>
                <sapn>{title}</sapn>
                <FlatButton primary style={{left: 10}} icon={<ActionSwitch />} onClick={(e) => {
                    console.log(this.props)
                    this.props.onClick(!(this.props.isDepartment || false))
                    this.props.switchTitle(this.props.resource, !(this.props.isDepartment || false))
                }} />
            </div>
        )
    }
}

DoloresTitle.propTypes = {
    resource: PropTypes.string.isRequired,
    isDepartment: PropTypes.bool,
};

const mapStateToProps = (state, ownerProps) => {
    if (state.titleSwitched.resource === ownerProps.resource) {
        return {isDepartment: state.titleSwitched.isDepartment}
    }
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        switchTitle: switchActionCreator,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DoloresTitle)

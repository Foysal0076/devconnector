import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom'

class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    render() {

        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            //Check if profile is empty
            if (Object.keys(profile).length > 0) {
                dashboardContent = <h1>TODO: Display Profile</h1>
            } else {
                //User is logged in but does not have a profile
                dashboardContent = (<div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not yet set up a profile, Plese add some info</p>
                    <Link to='/create-profile' className='btn btn-lg btn-info' >Create Profile</Link>
                </div>)
            }
        }

        return (
            <div className='dashboard' >
                <div className="container">
                    <div className="row">
                        <div className="col-md 12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
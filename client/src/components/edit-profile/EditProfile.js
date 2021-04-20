import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'
import { Link } from 'react-router-dom'

class EditProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.props.getCurrentProfile()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile

            //Bring skills array back to comma separated values
            const skillsCSV = profile.skills.join(',')

            //IF profile field doesnt exist make empty string
            profile.company = !isEmpty(profile.company) ? profile.company : ''
            profile.wesbite = !isEmpty(profile.wesbite) ? profile.website : ''
            profile.location = !isEmpty(profile.location) ? profile.location : ''
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : ''
            profile.bio = !isEmpty(profile.bio) ? profile : ''
            profile.social = !isEmpty(profile.social) ? profile.social : {}
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : ''
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : ''
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : ''
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : ''
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : ''

            //set component field state
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
                instagram: profile.instagram,
            })
        }
    }

    onChange(e) {
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        }

        this.props.createProfile(profileData, this.props.history)
    }

    render() {
        const { errors, displaySocialInputs } = this.state

        let socialInputs
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder='Twitter Profile URL'
                        name='twitter'
                        icon='fab fa-twitter'
                        value={this.state.twitter}
                        error={errors.twitter}
                        onChange={this.onChange}
                    />
                    <InputGroup
                        placeholder='Facebook Profile URL'
                        name='facebook'
                        icon='fab fa-facebook'
                        value={this.state.facebook}
                        error={errors.facebook}
                        onChange={this.onChange}
                    />
                    <InputGroup
                        placeholder='Youtube Profile URL'
                        name='youtube'
                        icon='fab fa-youtube'
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder='Instagram Profile URL'
                        name='instagram'
                        icon='fab fa-instagram'
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                    <InputGroup
                        placeholder='Linkedin Profile URL'
                        name='linkedin'
                        icon='fab fa-linkedin'
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                </div>
            )
        }

        //Select options for status
        const options = [
            {
                label: '* Select Professional Status',
                value: 0
            },
            {
                label: 'Developer',
                value: ' Developer'
            },
            {
                label: 'Junior Developer',
                value: 'Junior Developer'
            },
            {
                label: 'Senior Developer',
                value: 'Senior Developer'
            },
            {
                label: 'Manager',
                value: 'Manager'
            },
            {
                label: 'Student or Learning',
                value: 'Student or Learning'
            },
            {
                label: 'Instructor or Teacher',
                value: 'Instructor or Teacher'
            },
            {
                label: 'Intern',
                value: 'Intern'
            },
            {
                label: 'Other',
                value: 'Other'
            },
        ]
        return (
            <div className='create-profile' >
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to='/dashboard' className='btn btn-light'>
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Edit Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder='* Profile Handle'
                                    name='handle'
                                    value={this.state.handle}
                                    onChange={this.onChange}
                                    error={errors.handle}
                                    info='A unique handle for your profile URL. Your full name, company name, nickname'
                                />
                                <SelectListGroup
                                    placeholder='Status'
                                    name='status'
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    error={errors.status}
                                    options={options}
                                    info='Give us an idea of where you are in your career'
                                />
                                <TextFieldGroup
                                    placeholder='Company'
                                    name='company'
                                    value={this.state.company}
                                    onChange={this.onChange}
                                    error={errors.company}
                                    info='Could be your own company or one  you work for'
                                />
                                <TextFieldGroup
                                    placeholder='Website'
                                    name='website'
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                    info='Could be your own  or company website'
                                />
                                <TextFieldGroup
                                    placeholder='Location'
                                    name='location'
                                    value={this.state.location}
                                    onChange={this.onChange}
                                    error={errors.location}
                                    info='City & state suggested (eg. Boston, MA)'
                                />
                                <TextFieldGroup
                                    placeholder='* Skills'
                                    name='skills'
                                    value={this.state.skills}
                                    onChange={this.onChange}
                                    error={errors.skills}
                                    info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'
                                />
                                <TextFieldGroup
                                    placeholder='Github Username'
                                    name='githubusername'
                                    value={this.state.githubusername}
                                    onChange={this.onChange}
                                    error={errors.githubusername}
                                    info='If you want your latest repos and a Github link, include your username'
                                />
                                <TextAreaFieldGroup
                                    placeholder='A short bio of yourself'
                                    onChange={this.onChange}
                                    name='bio'
                                    value={this.state.bio}
                                    error={errors.bio}
                                    info='Tell us a little about yourself'
                                />
                                <div className="mb-3">
                                    <button type='button' onClick={() => {
                                        this.setState((prevState) => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} className="btn btn-light">
                                        Add Social Network Links
                                    </button>
                                    <span className='text-muted' >Optional</span>
                                </div>
                                {socialInputs}
                                <input type='submit' value='Submit' className='btn btn-info btn-block' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    createProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
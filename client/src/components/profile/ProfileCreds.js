import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

class ProfileCreds extends Component {


    render() {
        const { education, experience } = this.props

        const expItems = experience.map(exp => (
            <li key={exp._id} className='list-group-item' >
                <h4>{exp.company}</h4>
                <p> {moment(exp.from).format('Do MMMM YYYY')} -{' '}{exp.to === null ? 'Now' : moment(exp.to).format('Do MMMM YYYY')} </p>
                <p><strong>Position: </strong>{exp.title}</p>
                <p>
                    {exp.location === '' ? null : (<span><strong> Location: </strong>{exp.location}</span>)}
                </p>
                <p>
                    {exp.description === '' ? null : (<span><strong> Description: </strong>{exp.description}</span>)}
                </p>
            </li>
        ))
        const eduItems = education.map(edu => (
            <li key={edu._id} className='list-group-item' >
                <h4>{edu.school}</h4>
                <p> {moment(edu.from).format('Do MMMM YYYY')} -{' '} {edu.to === null ? 'Now' : moment(edu.to).format('Do MMMM YYYY')}  </p>
                <p><strong>Degree: </strong>{edu.degree}</p>
                <p><strong>Field of Study: </strong>{edu.fieldofstudy}</p>
                <p>
                    {edu.description === '' ? null : (<span><strong> Description: </strong>{edu.description}</span>)}
                </p>

            </li>
        ))

        return (
            <div className='row' >
                <div className="col-md-6">
                    <h3 className="text-center text-info">Experience</h3>
                    <div className="list-group">
                        {expItems}
                    </div>
                </div>
                <div className="col-md-6">
                    <h3 className="text-center text-info">Education</h3>
                    <div className="list-group">
                        {eduItems}
                    </div>
                </div>
            </div>
        )
    }
}

ProfileCreds.propTypes = {
    education: PropTypes.array.isRequired,
    experience: PropTypes.array.isRequired,
}

export default ProfileCreds
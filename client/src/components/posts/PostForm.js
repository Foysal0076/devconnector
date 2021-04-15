import React, { Component } from 'react';
import { addPost } from '../../actions/postAction'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';


class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const { user } = this.props.auth
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addPost(newPost)
        this.setState({
            text: ''
        })
    }
    render() {
        const { errors } = this.state
        return (
            <div class="post-form mb-3">
                <div class="card card-info">
                    <div class="card-header bg-info text-white">
                        Say Somthing...
              </div>
                    <div class="card-body">
                        <form onSubmit={this.onSubmit} >
                            <div class="form-group">
                                <TextAreaFieldGroup
                                    placeholder='Create a post'
                                    name='text'
                                    value={this.state.text}
                                    error={errors.text}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button type="submit" class="btn btn-dark">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps, { addPost })(PostForm);
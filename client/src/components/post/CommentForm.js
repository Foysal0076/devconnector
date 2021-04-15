import React, { Component } from 'react';
import { addComment } from '../../actions/postAction'
import PropTypes from 'prop-types'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';


class CommentForm extends Component {
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
        const { postId } = this.props
        const newComment = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addComment(postId, newComment)
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
                        Make a Comment
              </div>
                    <div class="card-body">
                        <form onSubmit={this.onSubmit} >
                            <div class="form-group">
                                <TextAreaFieldGroup
                                    placeholder='Reply to Post'
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

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps, { addComment })(CommentForm);
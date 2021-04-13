import React from 'react';
import classnames from 'classnames'
import PropTypes from 'prop-types'


const InputGroup = ({ name, placeholder, value, error, info, type, onChange, icon }) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} ></i>
                </span>
            </div>
            <input
                type={type}
                className={classnames("form-control form-control-lg", {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                onChange={onChange}
                name={name}
                value={value}
            />
            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    );
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;
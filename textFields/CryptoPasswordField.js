import React from 'react'
import TextInput from './CryptoTextInput'
import Eye from '../svg/crypto/eye-open.svg'
import EyeHide from '../svg/crypto/eye-close.svg'

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPassword: true,
        }
    }

    changeType() {
        this.setState({isPassword: !this.state.isPassword});
    }

    render() {
        return (
            <TextInput
                {...this.props}
                placeholder={this.props.placeholder}
                type={this.state.isPassword ? 'password' : 'text'}
                rightIcon={this.state.isPassword
                    ? <EyeHide onClick={() => this.changeType()}/>
                    : <Eye onClick={() => this.changeType()}/>}
            />
        )
    }
}
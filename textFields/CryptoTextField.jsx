import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`

const Input = styled.input`
    display: flex;
	height: 40px;
	width: 100%;
	padding: 1rem;
	border: 2px solid #242A33;
	${props => props['data-err'] && `
        border: 2px solid #df4b38!important;
	`}
	border-radius: 0.5rem;
	color: #9BA0AC;
	font-size: 13px;
	line-height: 15px;
	background-color: rgba(18,21,28,0.2);
	transition: .25s;
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-transition-delay: 9999s;
        -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
        color: #9BA0AC;
        -webkit-animation: autofill 0s forwards;
        animation: autofill 0s forwards;
    }
    &:focus:enabled {
	    border-color: ${({theme})=> theme.colors.blue};
	    outline: none;
	}
    &:disabled {
		background: rgba(0, 0, 0, 0.1);
		cursor: not-allowed;
	}
}
`

const ErrorMessage = styled.span`
    display: flex;
    align-items: center;
    align-self: flex-start;
    z-index: 100;
    position: absolute;
    top: 40px;
    color: #df4b38;
    font-size: 10px;
    font-weight: 400;
    pointer-events: none;
    user-select: none;
    flex-shrink: 0;
`

export default class InputField extends React.Component {
    constructor(props) {
        super(props);
    }

    handleInput = (e, additionalHandle) => {
        e.target.removeAttribute('readOnly')//for autocomplete disabling

        if (additionalHandle) {
            additionalHandle(e)
        }
    }

    render() {
        const {placeholder, name, type = 'text', className = '', style = {}} = this.props;
        const isError = this.props.error || null;

        let opts = {};
        opts['readOnly'] = 'readOnly';
        return (
            <Wrap style={style} className={className}>
                {isError &&
                <ErrorMessage>{isError}</ErrorMessage>
                }
                <Input
                    placeholder={placeholder}
                    disabled={this.props.disabled}
                    type={type}
                    name={name}
                    defaultValue={this.props.value || ''}
                    {...opts}
                    onClick={(e) => this.handleInput(e, this.props.onClick)}
                    onFocus={(e) => this.handleInput(e, this.props.onFocus)}
                    data-err={isError}
                />
            </Wrap>
        )
    }
}
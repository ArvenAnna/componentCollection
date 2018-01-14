import React from 'react'
import styled from 'styled-components'

const ErrorMessage = styled.span`
    display: flex;
    align-items: center;
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

const TextInput = ({error, leftIcon, rightIcon, placeholder, ...rest}) => { // eslint-disable-line no-unused-vars
    const isError = error || null;
    return (
        <InputWrapper>
            {isError && <ErrorMessage>{isError}</ErrorMessage>}
            <Input {...rest} leftIcon={!!leftIcon} rightIcon={!!rightIcon} placeholder={placeholder} data-err={isError}/>
            {leftIcon && <LeftIcon className='--text-input--left-icon'>{leftIcon}</LeftIcon>}
            {rightIcon && <RightIcon className='--text-input--right-icon'>{rightIcon}</RightIcon>}
        </InputWrapper>
    )
}

const LeftIcon = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    z-index: -1;
`

const RightIcon = styled.span`
    position: absolute;
    height: 40px;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 10px;
    display: flex;
    align-items: center;
    transition: .25s;
    font-size: 1.4rem;
	font-weight: 400;
	cursor: pointer;
	&:hover > svg {
        fill: ${({theme}) => theme.colors.hoveredStroke};
	}
`

const Input = styled.input.attrs({
    maxLength: '32'
})`
    width: 100%;
    height: 40px;
	border: 2px solid #242A33;
	${props => props['data-err'] && `
        border: 2px solid #df4b38;
	`}
	border-radius: 0.5rem;
	background: transparent;
	padding: 1rem ${({rightIcon}) => rightIcon ? '5.8rem' : '1.8rem'} 0.9rem ${({leftIcon}) => leftIcon ? '3.8rem' : '1.8rem'};
	font-size: 1.4rem;
	padding: 1rem;
	color: #9BA0AC;
	font-size: 1.2rem;
	line-height: 1.5rem;
	transition: .25s;
	&::placeholder{
	    font-size: 1.2rem;
	    font-weight: 300;
	}
	&.valid{
	    border-color: ${({theme}) => theme.colors.green};
	}
	&.invalid{
	    border-color: ${({theme}) => theme.colors.red};
	}
	
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
    -webkit-animation: autofill 0s forwards;
    animation: autofill 0s forwards;
    }

    @keyframes autofill {
        100% {
            background: transparent;
            color: inherit;
        }
    }
    
    @-webkit-keyframes autofill {
        100% {
            background: transparent;
            color: inherit;
        }
    }
`
const InputWrapper = styled.div`
    width: 100%;
    height: 65px;
    display: flex;
    position: relative;    
	svg{
	    stroke: ${({theme}) => theme.colors.elementsStroke};
	    fill: ${({theme}) => theme.colors.elementsStroke};
	    transition: .25s;
	}
	
	input:hover:enabled ~ .--text-input--left-icon > svg {
        stroke: ${({theme}) => theme.colors.hoveredStroke};
	}
	
	input:focus:enabled ~ .--text-input--left-icon > svg {
        stroke: ${({theme}) => theme.colors.blue};
	}
	
	input:disabled ~ .--text-input--left-icon > svg {
        stroke: ${({theme}) => theme.colors.lightGray};
	}
	
	input.valid ~ .--text-input--left-icon{
	    stroke: ${({theme}) => theme.colors.green};
	}
	input.invalid ~ .--text-input--left-icon{
	    stroke: ${({theme}) => theme.colors.red};
	}
	
	input:hover:enabled ~ .--text-input--right-icon{
	    border-color: ${({theme}) => theme.colors.hoveredStroke};
	}
	input:focus:enabled ~ .--text-input--right-icon{
	    border-color: ${({theme}) => theme.colors.blue};
	}
	input:focus:enabled {
	    border-color: ${({theme}) => theme.colors.blue};
	    outline: none;
	}
	input:disabled ~ .--text-input--right-icon{
	    background-color: ${({theme}) => theme.colors.lightGray};
	}
	input.valid ~ .--text-input--right-icon{
	    border-color: ${({theme}) => theme.colors.green};
	}
	input.invalid ~ .--text-input--right-icon{
	    border-color: ${({theme}) => theme.colors.red};
	}
	input:hover:enabled ~ .--text-input--right-icon > svg {
        fill: ${({theme}) => theme.colors.hoveredStroke};
	}
`

const InputLabel = styled.div`
    width: 100%;
    flex-wrap: wrap;
	color: ${({theme}) => theme.colors.blueGray};
	font-size: 1.3rem;
	margin-top: 1rem;
`

export {
    TextInput as default,
    InputWrapper,
    InputLabel,
    Input,
    LeftIcon,
    RightIcon
}
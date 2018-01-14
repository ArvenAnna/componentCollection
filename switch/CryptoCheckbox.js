import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
    display: flex;
    margin-top: 25px;
	color: #FFFFFF;	
	font-size: 13px;	
	font-weight: 600;	
	line-height: 18px;
	cursor: pointer;
`

const Agreement = styled.label`
	display: block;
	position: relative;
	padding-left: 30px;
	margin-bottom: 15px;
	color: #9BA0AC;	
	font-size: 12px;	
	line-height: 18px;
    &:hover input ~ div,
    &:focus ~ div {
	    background: #CCCCCC;
    }
    input:checked ~ div {
	    background: #2AA1C0;
    }
    &:hover input:not([disabled]):checked ~ div,
    input:checked:focus ~ div {
	    background: #0E647D;
    }
    input:disabled ~ div {
	    background: #E6E6E6;
	    opacity: 0.6;
	    pointer-events: none;
    }
    div:after {
	    content: '';
	    position: absolute;
	    display: none;
    }
    input:checked ~ div:after {
	    display: block;
    }
    div:after {
	    left: 4px;
	    width: 5px;
	    height: 8px;
	    border: solid #FFFFFF;
	    border-width: 0 2px 2px 0;
	    transform: rotate(45deg);
    }
    input:disabled ~ div:after {
	    border-color: #7B7B7B;
    }
    input {
        position: absolute;
	    z-index: -1;
	    opacity: 0;
    }
`

const ControlIndicator = styled.div`
    position: absolute;
	top: 2px;
	left: 0;
	height: 18px;
	width: 18px;
	padding: 2px;
	background: #E6E6E6;
	border: 2px solid #454755;
	border-radius: 2px;
	cursor: pointer;
`

export default class CryptoCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
        this.props.onChange && this.props.onChange(false)
    }

    handleState = () => {
        this.props.onChange && this.props.onChange(!this.state.checked);
        this.setState({checked: !this.state.checked});
    }

    render() {
        return (
            <Section>
                <Agreement>
                    <input type='checkbox' onClick={this.handleState} value={this.state.checked}/>
                    <ControlIndicator/>
                </Agreement>
            </Section>
        )
    }
}
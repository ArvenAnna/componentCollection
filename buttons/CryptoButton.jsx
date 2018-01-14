import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-self: center;
	height: 46px;	
	width: 193px;	
	border-radius: 3px;	
	background-color: #639BDC;
	outline: none;
	border: none;
	color: #FFFFFF;	
	font-size: 13px;	
	font-weight: 600;	
	line-height: 18px;
	cursor: ${({dis}) => dis ? 'not-allowed;' : 'pointer'};
`

export default class SecureButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button dis={this.props.disabled} disabled={this.props.disabled} type={this.props.type} style={this.props.style}>{this.props.content}</Button>
        )
    }
}
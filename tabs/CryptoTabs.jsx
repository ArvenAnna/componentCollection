import React from 'react';
import styled from 'styled-components';
import * as PropTypes from "prop-types";

export const Tabs = styled.section`
	display: flex;
	justify-content: center;
	height: 70px;
	width: 100%;
	border-bottom: 2px solid #191d23;
`

const Tab = styled.span`
    display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: content-box;
	height: 100%;
	width: 80px;
	color: #ffffff;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	&:hover {
		color: #ffffff;
	}
	
	&.active_tab {
	    color: #639bdc;
	    border-bottom: 4px solid #639bdc; 
	    
	    &:hover {
	        color: #639bdc;
	    }
	}
`

class CryptoTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: this.props.activeIndex || 0
        }
    }

    static propTypes = {
        "tabs": PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                name: PropTypes.string
            })
        ])),
        "activeIndex": PropTypes.number,
        "onClick": PropTypes.func,
        "className": PropTypes.string
    }

    getTabName(tabInfo) {
        let tabName = '';
        if (typeof tabInfo == 'string') {
            tabName = tabInfo;
        } else if (tabInfo !== null && typeof tabInfo === 'object') {
            tabName = tabInfo.name;
        }
        return tabName;
    }

    onClick(e, tabInfo) {
        const activeIndex = this.props.tabs.indexOf(tabInfo);
        this.setState({
            activeTab: activeIndex
        });
        this.props.onClick && this.props.onClick(tabInfo, activeIndex);
    }

    render() {
        return <Tabs className={this.props.className ? this.props.className : ''}>
            {this.props.tabs.map((tab, index) => {
                const tabName = this.getTabName(tab);
                return <Tab
                    key={index}
                    onClick={e => this.onClick(e, tab)}
                    className={this.state.activeTab == index ? 'active_tab' : ''}
                >{tabName}</Tab>;
            })}
        </Tabs>;
    }
}

export default CryptoTabs;

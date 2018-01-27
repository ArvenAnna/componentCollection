import React from 'react'
import styled from 'styled-components'
import ChevronDown from '../svg/crypto/chevron down _g.svg'
import EN from '../svg/crypto/EN.svg'
import SP from '../svg/crypto/SP.svg'
import FR from '../svg/crypto/FR.svg'
import IT from '../svg/crypto/IT.svg'
import RU from '../svg/crypto/RU.svg'
import Tr from '../svg/crypto/Tr.svg'
import JP from '../svg/crypto/JP.svg'

const supportedLocales = [
    {
        name: 'en',
        svg: EN,
        originName: 'English'
    },
    {
        name: 'sp',
        svg: SP,
        originName: 'Español'
    },
    {
        name: 'fr',
        svg: FR,
        originName: 'Français'
    },
    {
        name: 'it',
        svg: IT,
        originName: 'Italiano'
    },
    {
        name: 'ru',
        svg: RU,
        originName: 'Русский'
    },
    {
        name: 'tr',
        svg: Tr,
        originName: 'Türkçe'
    },
    {
        name: 'jp',
        svg: JP,
        originName: '日本語'
    }
]

const Wrapper = styled.div`
    position: relative;
    height: 46px;
    padding-left: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 0.2rem solid #0D0F15;
    transition: 1s;
    cursor: pointer;
    &:hover{
        background-color: #181B25;
    }
    &:hover .languages-list{
        max-height: 400px;
        transition: .5s;
        padding: 0.5rem 0;
        border-radius: 4px;
    }
    .languages-list{
        background-color: #0E1117;
        position: absolute;
        top: 50px;
        right: 0;
    }
    > svg {
        margin-right: 4px;
        border-radius: 100%;
    }
`

const StyledList = styled.ul`
    width: 155px;
    background-color: #0E1117;
    position: absolute;
    top: 54px;
    right: 0;
    z-index: 2;
    max-height: 0px;
    transition: .5s;
    overflow: hidden;
    box-shadow: 0 4px 10px 0 rgba(34,36,37,0.15);
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: left;
`

const StyledItem = styled.li`
    padding: 0.8rem 1.6rem;
    &:hover{
        background-color: #181B25;
        color: #ffffff;
    }
    cursor: pointer;
    svg, span{
        vertical-align: top;
    }
    svg{
        margin-top: 2px;
    }
`

const LangName = styled.span`
    margin-left: 1.6rem;
    font-size: 1.4rem;
    color: #7E899E;
    &:hover{
        color: #ffffff;
    }
`

export default class CryptoLangSwitcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLang: 'en'
        }
    }

    render() {
        const CurrentLocale = supportedLocales.filter(item => item.name == this.props.lang)[0].svg
        return (
            <Wrapper>
                <CurrentLocale/>
                <ChevronDown/>
                <StyledList className='languages-list'>
                    {supportedLocales.filter(item => item.name != this.props.lang).map((item, index) => {
                        return (
                            <StyledItem key={index} onClick={() => this.props.onChange(item.name)}>
                                <item.svg/>
                                <LangName>{item.originName}</LangName>
                            </StyledItem>
                        )
                    })}
                </StyledList>
            </Wrapper>
        )
    }
}
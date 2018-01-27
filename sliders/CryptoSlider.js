import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

const StyledSlider = styled(Slider)`
	padding: 6rem 0 10rem 0;
	width: 100%;

	& .slick-track {
		display: flex;
	}

	& .slick-slide {
		display: flex;
		height: auto;
		align-items: center; //optional
		justify-content: center; //optional
	}

	& .slick-dots {
		bottom: 4rem;
		left: 50%;
		transform: translateX(-50%);
		& li {
			& button {
				border: 3px solid rgba(71, 100, 135, 1);
				opacity: 0.2;
				border-radius: 100%;
				width: 1.5rem;
				height: 1.5rem;
				&::before {
					content: '';
				}
			}

			&.slick-active button {
				background: linear-gradient(
					180deg,
					rgba(110, 203, 197, 1) 0%,
					rgba(85, 135, 193, 1) 100%
				);
				border: none;
				width: calc(1.5rem + 3px);
				height: calc(1.5rem + 3px);
				opacity: 1;
			}
		}
	}
`

const Slide = styled.div`
	width: 65rem;
	color: #fff;
	display: flex;
	flex-direction: column;
	padding: 4rem;
	margin-right: 3rem;
	border-radius: 6px;
	background-color: rgba(255, 255, 255, 0.05);
	box-shadow: 0 5px 14px 0 rgba(65, 70, 101, 0.15);
	min-height: 60rem;
	min-width: 65rem;
`

const Title = styled.span`
	text-transform: uppercase;
	font-size: 1.5rem;
	line-height: 2rem;
	max-width: 70rem;
	text-align: center;
	margin-top: 1rem;
	color: rgb(77, 136, 207);
	font-weight: 600;
	opacity: 1;
	text-align: left;
`
const Content = styled.div`
	padding-top: 2rem;
	font-size: 1.5rem;
	line-height: 2.5rem;
`

export default class MainSlider extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const sliderSettings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            focusOnSelect: true
        }

        return (
            <StyledSlider {...sliderSettings}>
                {this.props.slides.map((slide, i) => (
                    <Slide key={i}>
                        <Title>{slide.title}</Title>
                        <Content>{slide.content.map((part, i) => <p key={i}>{part}</p>)}</Content>
                    </Slide>
                ))}
            </StyledSlider>
        )
    }
}

import * as React from "react";
import * as PropTypes from "prop-types";
import * as ReactDOM from "react-dom";
import './_CoreRadialprogress.less';

/**
 * @todo Convert to SVG once IE8 is officially out   // not switched in
 */
export default class CoreRadialProgress extends React.Component {

    static propTypes = {//
        size: PropTypes.number.isRequired, //
        backgroundColor: PropTypes.string, //
        barColor: PropTypes.string.isRequired, //
        thickness: PropTypes.number, //
        percent: PropTypes.number.isRequired, //
        withText: PropTypes.bool, //
        textColor: PropTypes.string
    };

    static defaultProps = {
        size: 0,
        barColor: "",
        percent: 0,

        thickness: 10,
        withText: false,
        backgroundColor: "#ccc"
    };

    componentDidMount() {
        this.update();
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        this.update();
    }

    update() {
        const radius = (this.props.size / 2 | 0);
        const canvas = ReactDOM.findDOMNode(this.refs["canvas"]) as HTMLCanvasElement;
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.renderBackground(context, radius);
        this.renderBar(context, radius);
        if (this.props.withText) {
            this.renderText(context, radius);
        }
    }

    renderBackground(context, radius) {
        context.fillStyle = this.props.backgroundColor;
        context.beginPath();
        context.arc(radius, radius, radius, 0, Math.PI * 2, false);
        context.arc(radius, radius, radius - this.props.thickness, Math.PI * 2, 0, true);
        context.fill();
    }

    renderBar(context, radius) {
        context.fillStyle = this.props.barColor;
        const startAngle = Math.PI * 1.5;
        const degrees = this.props.percent * 3.6;
        const radians = degrees * (Math.PI / 180);
        context.beginPath();
        context.arc(radius, radius, radius, startAngle, startAngle + radians, false);
        context.arc(radius, radius, radius - this.props.thickness, startAngle + radians, startAngle, true);
        context.fill();
    }

    renderText(context, radius) {
        context.fillStyle = this.props.textColor == null ? this.props.barColor : this.props.textColor;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "bold " + ((radius / 2 | 0)) + "px Arial";
        context.fillText(Math.round(this.props.percent) + "%", radius, radius, 200);
    }

    render() {
        return <canvas width={this.props.size} height={this.props.size} ref="canvas" />;
    }
}

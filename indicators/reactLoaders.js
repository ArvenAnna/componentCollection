import React from 'react';
import Loader from 'react-loaders';
import 'loaders.css/src/animations/ball-pulse.scss';
import 'loaders.css/src/animations/ball-grid-pulse.scss';
import 'loaders.css/src/animations/ball-clip-rotate.scss';
import 'loaders.css/src/animations/ball-clip-rotate-pulse.scss';
import 'loaders.css/src/animations/square-spin.scss';
import 'loaders.css/src/animations/ball-clip-rotate-multiple.scss';
import 'loaders.css/src/animations/ball-pulse-rise.scss';
import 'loaders.css/src/animations/ball-rotate.scss';
import 'loaders.css/src/animations/cube-transition.scss';
import 'loaders.css/src/animations/ball-zig-zag.scss';
import 'loaders.css/src/animations/ball-zig-zag-deflect.scss';
//import 'loaders.css/src/animations/ball-triangle-path.scss';
import 'loaders.css/src/animations/ball-scale.scss';
import 'loaders.css/src/animations/line-scale.scss';
//import 'loaders.css/src/animations/line-scale-party.scss';
import 'loaders.css/src/animations/ball-scale-multiple.scss';
import 'loaders.css/src/animations/ball-pulse-sync.scss';
import 'loaders.css/src/animations/ball-beat.scss';
import 'loaders.css/src/animations/line-scale-pulse-out.scss';
import 'loaders.css/src/animations/line-scale-pulse-out-rapid.scss';
import 'loaders.css/src/animations/ball-scale-ripple.scss';
import 'loaders.css/src/animations/ball-scale-ripple-multiple.scss';
import 'loaders.css/src/animations/ball-spin-fade-loader.scss';
import 'loaders.css/src/animations/line-spin-fade-loader.scss';
import 'loaders.css/src/animations/triangle-skew-spin.scss';
import 'loaders.css/src/animations/pacman.scss';
import 'loaders.css/src/animations/ball-grid-beat.scss';
import 'loaders.css/src/animations/semi-circle-spin.scss';

// to change primary color use in scss : $primary-color: $my-brand-color;  http://jonjaques.github.io/react-loaders/
class ReactLoaders extends React.Component {

    render() {
        return <div className="element_block_container ">
            <div className="element_block react_loaders_margin crypto_bg">
                <div><Loader type="ball-pulse" /></div>
                <div><Loader type="ball-grid-pulse" /></div>
                <div><Loader type="ball-clip-rotate" /></div>
                <div><Loader type="ball-clip-rotate-pulse" /></div>
                <div><Loader type="square-spin" /></div>
                <div><Loader type="ball-clip-rotate-multiple" /></div>
                <div><Loader type="ball-pulse-rise" /></div>
                <div><Loader type="ball-rotate" /></div>
                <div><Loader type="cube-transition" /></div>
                <div><Loader type="ball-zig-zag" /></div>
                <div><Loader type="ball-zig-zag-deflect" /></div>
                {/*<Loader type="ball-triangle-path" />*/}
                <div><Loader type="ball-scale" /></div>
                <div><Loader type="line-scale" /></div>
                {/*<Loader type="line-scale-party" />*/}
                <div><Loader type="ball-scale-multiple" /></div>
                <div><Loader type="ball-pulse-sync" /></div>
                <div><Loader type="ball-beat" /></div>
                <div><Loader type="line-scale-pulse-out" /></div>
                <div><Loader type="line-scale-pulse-out-rapid" /></div>
                <div><Loader type="ball-scale-ripple" /></div>
                <div><Loader type="ball-scale-ripple-multiple" /></div>
                <div><Loader type="ball-spin-fade-loader" /></div>
                <div> <Loader type="line-spin-fade-loader" /></div>
                <div><Loader type="triangle-skew-spin" /></div>
                <div><Loader type="pacman" /></div>
                <div><Loader type="ball-grid-beat" /></div>
                <div><Loader type="semi-circle-spin" /></div>
            </div>

        </div>;
    }
}

export default ReactLoaders;

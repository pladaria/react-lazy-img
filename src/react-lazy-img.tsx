import * as React from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
    offset: number;
    transition: string;
    fallback?: () => React.ReactNode;
}

type State = {
    isVisible: boolean;
    isLoaded: boolean;
    opacity: number;
};

const isIntersectionObserverAvailable = () =>
    'IntersectionObserver' in window && 'IntersectionObserverEntry' in window;

export default class Img extends React.Component<Props, State> {
    state: State = {
        isVisible: !isIntersectionObserverAvailable(),
        isLoaded: !isIntersectionObserverAvailable(),
        opacity: 0
    };

    static defaultProps = {
        offset: 500,
        transition: 'opacity 0.3s ease-in',
        fallback: () => null
    };

    ref: any;
    observer?: IntersectionObserver;

    constructor(props: Props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        if (!isIntersectionObserverAvailable()) {
            return;
        }
        this.observer = new IntersectionObserver(this.handleIntersection, {
            rootMargin: this.props.offset + 'px'
        });
        this.observer.observe(this.ref.current);
    }

    componentDidUpdate() {
        if (this.state.isLoaded && !this.state.opacity) {
            this.setState({ opacity: 1 });
        }
    }

    handleIntersection: IntersectionObserverCallback = entries => {
        if (!entries[0].isIntersecting) {
            return;
        }
        const { fallback = () => null, offset, transition, ...attributes } = this.props;
        const img = new Image();
        Object.assign(img, attributes);
        img.onload = () => {
            this.setState({ isLoaded: true });
        };
        this.observer!.unobserve(this.ref.current);
    };

    handleTransitionEnd = () => {
        this.setState({ isVisible: true });
    };

    render() {
        const { fallback, style, transition, ...props } = this.props;
        const { isVisible, isLoaded, opacity } = this.state;

        const imgStyle: React.CSSProperties = {
            display: 'inline-block',
            verticalAlign: 'bottom',
            width: props.width,
            height: props.height,
            ...style
        };

        const containerStyle: React.CSSProperties = {
            width: imgStyle.width,
            height: imgStyle.height,
            position: 'relative'
        };

        const imgContainerStyle: React.CSSProperties = {
            top: 0,
            left: 0,
            position: 'absolute',
            opacity,
            transition
        };

        if (isVisible) {
            return <img {...props} style={imgStyle} />;
        }

        return (
            <div style={containerStyle} ref={this.ref}>
                {fallback!()}
                <div style={imgContainerStyle} onTransitionEnd={this.handleTransitionEnd}>
                    {isLoaded && <img {...props} style={imgStyle} />}
                </div>
            </div>
        );
    }
}

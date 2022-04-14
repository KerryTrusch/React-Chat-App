import "./MidButton.css";
function MidButton(props) {
    return (
        <div className="MidButtonWrapper">
            <a className="MidButtonContainer" href="#">
                <div className="MidButtonSVG">
                    <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                        <g fill="none" fillRule="evenodd">
                            <path fill="currentColor" fillRule="nonzero" d={props.svgLink} transform="translate(2 4)"></path>
                        </g>
                    </svg>
                </div>
                <div className="MidButtonSpanWrapper">
                    <span className="MidButtonSpan"> {props.name}</span>
                </div>
            </a>
        </div>
    )
}

export default MidButton;
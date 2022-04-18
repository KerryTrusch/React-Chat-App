function ButtonText(props) {
    return (
        <button className={props.styling}><small>{props.text}</small></button>
    )
}

export default ButtonText;
import "./Button.css";

function Button({ children, onClick, className, style }){
    return(
        <div className= "button">
            <button style={style} className={className} onClick={onClick}>{children}</button>
        </div>
    )
}

export default Button;
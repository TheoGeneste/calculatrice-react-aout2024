const ButtonComponent = ({textToDisplay, functionToDo, classN}) => {
    return <>
        <button className={classN} onClick={functionToDo}>{textToDisplay}</button>
    </>
}

export default ButtonComponent;
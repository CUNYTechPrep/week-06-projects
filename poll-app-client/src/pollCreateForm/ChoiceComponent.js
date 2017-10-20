import React from 'react';

function ChoiceComponent(props) {
    return (
        <div >
            <input type="text" className="form-control" name="question"
                placeholder="Enter a choice" onChange={props.handleChoice}></input>
            <br />
        </div>


    )
}

export default ChoiceComponent;
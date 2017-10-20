import React from 'react';

function PollCreateForm(props){
    return(
        <div className="container">
            <div className="col-md-12">
            	<form onSubmit={props.submit}>
            		<div className="form-group">
            		    <label htmlFor="Question">Question: </label><br />
                        <input type="text" className="form-control" name="question"
                          placeholder="Enter a question" onChange={props.change}></input>
                        <label htmlFor="Choices">Choices: </label><br />
                        <div className='row'>
                            <div className="col-md-11">
                                <input type="text" className="form-control" name="question"
                                placeholder="Enter a choice" onChange={props.change}></input>
                            </div>
                            <div className="col-md-1">
                            <button type="button" class="btn btn-default btn-lg">
                                <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            </button>
                            </div>
                        </div>
                        <br />
                        <input type="submit" value="Submit" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default PollCreateForm;
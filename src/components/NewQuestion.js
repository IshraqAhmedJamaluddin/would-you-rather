import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        text1: '',
        text2: '',
        toHome: false
    }
    handleChange1 = (e) => {
        const text1 = e.target.value

        this.setState(() => ({
            text1
        }))
    }
    handleChange2 = (e) => {
        const text2 = e.target.value

        this.setState(() => ({
            text2
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { text1, text2 } = this.state
        const { dispatch } = this.props
        dispatch(handleAddQuestion(text1, text2))
        this.setState(() => ({
            text1: '',
            text2: '',
            toHome: true
        }))
    }
    render() {
        const { text1, text2, toHome } = this.state
        if (toHome === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h3 className='center'>Create New Question</h3>
                <p>Complete the question:</p>
                <h4>Would you rather ...</h4>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Option One Text Here"
                        value={text1}
                        onChange={this.handleChange1}
                    />
                    <p>OR</p>
                    <input
                        type="text"
                        placeholder="Enter Option Two Text Here"
                        value={text2}
                        onChange={this.handleChange2}
                    />
                    <button
                        className='btn'
                        type='submit'
                        disabled={(text1 === '' || text2 === '')}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewQuestion);
// Write your JS code here

import {Component} from 'react'

class RegistrationForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    showFirstNameErrorMsg: false,
    showLastNameErrorMsg: false,
    isFormSubmitted: false,
  }

  onBlurLastName = () => {
    const isValidLastName = this.validateLastName()
    this.setState({showLastNameErrorMsg: !isValidLastName})
  }

  onChangeLastName = event => {
    const {target} = event
    const {value} = target
    this.setState({lastName: value})
  }

  renderLastNameField = () => {
    const {lastName, showLastNameErrorMsg} = this.state
    const className = showLastNameErrorMsg ? 'name-input-error' : 'name-input'
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          className={className}
          value={lastName}
          placeholder="Last name"
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
      </div>
    )
  }

  onBlurFirstName = () => {
    const isValidFirstName = this.validateFirstName()
    this.setState({showFirstNameErrorMsg: !isValidFirstName})
  }

  onChangeFirstName = event => {
    const {target} = event
    const {value} = target
    this.setState({firstName: value})
  }

  renderFirstNameField = () => {
    const {firstName, showFirstNameErrorMsg} = this.state
    const className = showFirstNameErrorMsg ? 'name-input-error' : 'name-input'
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          className={className}
          value={firstName}
          placeholder="First name"
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
      </div>
    )
  }

  validateLastName = () => {
    const {lastName} = this.state

    return lastName !== ''
  }

  validateFirstName = () => {
    const {firstName} = this.state

    return firstName !== ''
  }

  onSubmitForm = event => {
    event.preventDefault()

    const isValidFirstName = this.validateFirstName()
    const isValidLastName = this.validateLastName()
    if (isValidFirstName && isValidLastName) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showFirstNameErrorMsg: !isValidFirstName,
        showLastNameErrorMsg: !isValidLastName,
        isFormSubmitted: false,
      })
    }
  }

  renderRegistrationForm = () => {
    const {showFirstNameErrorMsg, showLastNameErrorMsg} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitForm}>
        {this.renderFirstNameField()}
        {showFirstNameErrorMsg && <p className="error-msg">Required</p>}
        {this.renderLastNameField()}
        {showLastNameErrorMsg && <p className="error-msg">Required</p>}
        <button className="submit-button" type="button">
          Submit
        </button>
      </form>
    )
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  renderSubmissionSuccessView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-img"
      />
      <p>Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="form-heading">Registration</h1>
        <div className="form-con">
          {isFormSubmitted
            ? this.renderSubmissionSuccessView()
            : this.renderRegistrationForm()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm

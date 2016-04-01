import React, {Component, PropTypes} from 'react'

import {Card, CardText} from 'react-toolbox/lib/card'
import ProgressBar from 'react-toolbox/lib/progress_bar'

import AuthButton from './AuthButton'
import UserForm from '../containers/UserForm'

import styles from './SignInUp.scss'

class SignUp extends Component {
  render() {
    const {
      auth: {currentUser},
      code,
      inviteCodes,
    } = this.props

    let cardContent = (
      <div>
        <CardText>Validating invite code ...</CardText>
        <ProgressBar type="linear" mode="indeterminate"/>
      </div>
    )
    if (!inviteCodes.isBusy) {
      if (inviteCodes.codes[code]) {
        if (currentUser) {
          cardContent = (
            <div>
              <CardText style={{textAlign: 'left'}}>
                Complete the sign-up process by providing the information below.
              </CardText>
              <UserForm buttonLabel="Sign Up"/>
            </div>
          )
        } else {
          cardContent = (
            <div>
              <h5 className={styles.welcome}>Welcome!</h5>
              <CardText>
                We'll need your <a target="_blank" href="https://github.com">GitHub</a> account information, so the first step is to authenticate using GitHub. If you haven't yet created a GitHub account, you should <a target="_blank" href="https://github.com/join">do that now</a>.
              </CardText>
              <AuthButton label="Authenticate" authURL={`/auth/github/sign-up`} redirect={`/sign-up/${code}`} inviteCode={code}/>
            </div>
          )
        }
      } else {
        cardContent = (
          <CardText>Invalid invite code.</CardText>
        )
      }
    }

    return (
      <Card className={styles.card}>
        <div className={styles.cardContent}>
          <img className={styles.lgLogo} src="https://brand.learnersguild.org/assets/learners-guild-logo-black-250x149.png"/>
          {cardContent}
        </div>
      </Card>
    )
  }
}

SignUp.propTypes = {
  auth: PropTypes.shape({
    isBusy: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
  }),
  inviteCodes: PropTypes.shape({
    isBusy: PropTypes.bool.isRequired,
    codes: PropTypes.object.isRequired,
  }).isRequired,
  code: PropTypes.string.isRequired,
}

export default SignUp

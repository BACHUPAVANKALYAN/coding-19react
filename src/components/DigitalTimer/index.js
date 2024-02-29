import Component from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerElapsedSeconds: 0,
  timerLimitToMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitToMinutes} = this.state

    if (timerLimitToMinutes > 1) {
      this.setState(prevState => ({
        timerLimitToMinutes: prevState.timerLimitToMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitToMinutes = () =>
    this.setState(prevState => ({
      timerLimitToMinutes: prevState.timerLimitToMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerElapsedSeconds, timerLimitToMinutes} = this.state
    const isButtonDisabled = timerElapsedSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-text">Set Timer Limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            type="button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="value-limit">{timerLimitToMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonDisabled}
            type="button"
            onClick={this.onIncreaseTimerLimitToMinutes}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitToMinutes, timerElapsedSeconds} = this.state
    const isTimerCompleted = timerElapsedSeconds === timerLimitToMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerElapsedSeconds: prevState.timerElapsedSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerElapsedSeconds,
      timerLimitToMinutes,
    } = this.state
    const isTimerCompleted = timerElapsedSeconds === timerLimitToMinutes * 60

    if (isTimerCompleted) {
      this.setState({timerElapsedSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const pauseOrPlayAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="time-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={pauseOrPlayAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          onClick={this.onResetTimer}
          className="timer-controller-btn"
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitToMinutes, timerElapsedSeconds} = this.state
    const totalRemainingSeconds = timerLimitToMinutes * 60 - timerElapsedSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringMin = minutes > 9 ? minutes : `0${minutes}`
    const stringSec = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMin}:${stringSec}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

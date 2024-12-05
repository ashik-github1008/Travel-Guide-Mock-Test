import {Component} from 'react'
import Loader from 'react-loader-spinner'

import PackageItem from '../PackageItem/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {apiStatus: apiStatusConstants.initial, travelPackagesList: []}

  componentDidMount() {
    this.getTravelPackagesData()
  }

  getTravelPackagesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const packagesData = fetchedData.packages
      const updatedData = packagesData.map(eachPackage => ({
        id: eachPackage.id,
        name: eachPackage.name,
        imageUrl: eachPackage.image_url,
        description: eachPackage.description,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        travelPackagesList: updatedData,
      })
    }
  }

  renderPackageListContainerSuccessView = () => {
    const {travelPackagesList} = this.state
    return (
      <ul className="package-list-container">
        {travelPackagesList.map(eachPackage => (
          <PackageItem key={eachPackage.id} packageDetails={eachPackage} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => {
    return (
      <div data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    )
  }

  renderTravelPackageListContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPackageListContainerSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1>Travel Guide</h1>
        {this.renderTravelPackageListContainer()}
      </div>
    )
  }
}

export default TravelGuide

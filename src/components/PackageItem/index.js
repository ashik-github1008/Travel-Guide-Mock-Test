import './index.css'

const PackageItem = props => {
  const {packageDetails} = props
  const {id, name, imageUrl, description} = packageDetails

  return (
    <li className="package-item-container">
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>
    </li>
  )
}

export default PackageItem

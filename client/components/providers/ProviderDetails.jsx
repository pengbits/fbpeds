import { Link } from "react-router"
const htmlFromMarkDown = (md) => {
  return ['<p>',
    md
      .replace(/\n\-/g, '<br />-')
      .replace(/\n\s\n/g, '</p><p>'),
  '</p>'].join('')
}

export default ({
  id,
  name,
  about,
  medical_degree,
  image
}) => {
  return (
  <div className="card">
    <h3>{name}, {medical_degree}</h3>
    {image && <div className="provider__image provider__image--large">
      <img src={image} />
    </div>}
    <div className="about" dangerouslySetInnerHTML={{
      __html: htmlFromMarkDown(about)}
    }></div>
    <p><Link to='/providers'>Back</Link></p>
  </div>)
}
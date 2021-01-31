import edit from '../../edit.module.css';

export default function MainWrapper({children}) {
  return (
    <div className={edit.wrapper}>
      	{children}
    </div>
  )
}
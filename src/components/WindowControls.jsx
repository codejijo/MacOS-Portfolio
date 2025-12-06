import useWindowStore from "@store/window";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore()
  return (
    <div id="window-controls">
      <button type="button" className="close" onClick={() => closeWindow(target)} />
      <button type="button" className="minimize" onClick={() => closeWindow(target)} />
      <button type="button" className="maximize" />
    </div>
  )
}

export default WindowControls;
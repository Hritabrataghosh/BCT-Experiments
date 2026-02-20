export default function Snackbar({ show, onUndo }) {
  if (!show) return null;
  return (
    <div className="snackbar">
      Task deleted
      <button onClick={onUndo}>UNDO</button>
    </div>
  );
}

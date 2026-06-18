export default function CheckSVG({ checked }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      {checked && <path d="M3 8l3.5 3.5L13 4.5" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

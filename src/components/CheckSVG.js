export default function CheckSVG({ checked }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14" className={checked ? "svg-chk-active" : ""}>
      {checked && (
        <path
          d="M3 8l3.5 3.5L13 4.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

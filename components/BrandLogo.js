export default function BrandLogo({ light = false, compact = false }) {
  const ink = light ? '#ffffff' : '#08140f';
  return (
    <span className={`brand-logo ${compact ? 'brand-logo--compact' : ''}`} aria-label="Greenova8">
      <svg viewBox="0 0 248 38" role="img" aria-hidden="true">
        <g fill={ink}>
          <path d="M2 8.3C2 3.7 5.7 0 10.3 0H36v7.5H11.6c-1.1 0-2 .9-2 2v18.9c0 1.1.9 2 2 2h17v-7.8H17v-7.1h19.6V38H10.3C5.7 38 2 34.3 2 29.7V8.3Z"/>
          <path d="M43.5 0H71c7 0 12 4.2 12 10.6 0 4.4-2.5 7.8-6.5 9.4L86 38h-9.6l-8.1-16.1H51V38h-7.5V0Zm7.5 7.5v7.2h19.3c3.3 0 5.1-1.3 5.1-3.6 0-2.4-1.8-3.6-5.1-3.6H51Z"/>
          <path d="M91 0h31v7.5h-23.5v7.4h20.8V22H98.5v8.5H122V38H91V0Z"/>
          <path d="M128 0h31v7.5h-23.5v7.4h20.8V22h-20.8v8.5H159V38h-31V0Z"/>
          <path d="M166 0h8.2l18.4 25V0h7.7v38h-8.1l-18.5-25.2V38H166V0Z"/>
        </g>
        <g transform="translate(201 19)">
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={i} x="-1" y="-17" width="2" height="7" rx="1" fill="#7fe14a" transform={`rotate(${i * 22.5})`} />
          ))}
          <circle r="8.6" fill="#7fe14a" />
          <circle r="3.1" fill="#ffffff" />
        </g>
        <text x="220" y="29" fill={ink} fontFamily="Arial, sans-serif" fontSize="29" fontWeight="800">8</text>
      </svg>
    </span>
  );
}

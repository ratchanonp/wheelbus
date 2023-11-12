const StopMarker = () => {
    return (
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Vertical Line */}
            <line x1="20" y1="10" x2="20" y2="30" stroke="#000" strokeWidth="3" />

            {/* Circle */}
            <rect x="10" y="0" rx="3" ry="3" width="20" height="20" fill="#ef4444" stroke="#fff" strokeWidth="2.5" />
        </svg>
    )
}


export default StopMarker
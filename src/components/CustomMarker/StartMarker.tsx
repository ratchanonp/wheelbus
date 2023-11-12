
const StartMarker = () => {
    return (
        <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Vertical Line */}
            <line x1="20" y1="10" x2="20" y2="30" stroke="#000" strokeWidth="3" />

            {/* Circle */}
            <circle cx="20" cy="10" r="10" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
            <circle cx="20" cy="10" r="3.5" fill="#fff" strokeWidth="3" />
        </svg>
    )
}

export default StartMarker
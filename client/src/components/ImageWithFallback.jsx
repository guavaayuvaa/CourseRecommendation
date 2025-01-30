import React, { useState } from "react"

const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleError = () => {
    setError(true)
    setLoading(false)
  }

  const handleLoad = () => {
    setLoading(false)
  }

  return (
    <div className="relative">
      {loading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <img
        src={error ? "/placeholder.svg" : src}
        alt={alt}
        className={`${className} ${loading ? "opacity-0" : "opacity-100"}`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  )
}

export { ImageWithFallback }


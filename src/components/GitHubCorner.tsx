import React from 'react'

const GitHubCorner: React.FC = () => {
  return (
    <a
      href="https://github.com/kater-iam/jgrants-front"
      className="github-corner"
      aria-label="View source on GitHub"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        style={{ fill: '#151513', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0 }}
        aria-hidden="true"
      >
        <path d="m0,0 0,250 250,250 0,-250 z" />
        <path
          d="m128.3,109.0 c113.8,99.7 119.0,89.6 119.0,89.6 0,0 15.5,-10.7 15.5,-10.7 0,0 20.4,-29.6 5.8,-31.4 -14.6,-1.8 -33.6,16.4 -38.8,18.6 -5.2,2.2 -15.5,10.7 -15.5,10.7 0,0 -2.3,-0.4 -2.3,-0.4 -0.1,-1.2 -0.1,-2.6 0.1,-4.1 0.7,-4.9 3.1,-10.0 6.1,-14.5 6.2,-9.2 15.5,-17.6 25.8,-23.2 10.3,-5.6 21.9,-9.3 33.9,-10.9 12.0,-1.6 24.4,-1.2 36.4,1.2 12.0,2.4 23.6,6.7 34.3,12.5 0,0 20.4,-29.6 5.8,-31.4 -14.6,-1.8 -33.6,16.4 -38.8,18.6 -5.2,2.2 -15.5,10.7 -15.5,10.7 0,0 5.2,-2.2 5.2,-2.2 z"
          fill="currentColor"
          style={{ transformOrigin: '130px 106px' }}
          className="octo-arm"
        />
        <path
          d="m115.0,115.0 c114.9,17.1 89.1,48.4 89.1,48.4 0,0 5.2,-2.2 5.2,-2.2 0,0 -7.8,-30.6 -15.5,-10.7 -7.7,19.9 -5.2,2.2 -5.2,2.2 z m124.1,113.8 c115.0,17.1 89.1,48.4 89.1,48.4 0,0 5.2,-2.2 5.2,-2.2 0,0 -7.8,-30.6 -15.5,-10.7 -7.7,19.9 -5.2,2.2 -5.2,2.2 z"
          fill="currentColor"
        />
      </svg>
    </a>
  )
}

export default GitHubCorner
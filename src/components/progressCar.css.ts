import { css } from "../styled-system/css";

export const ProgressContainer = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem'
})

export const ProgressBar = css({
    width: '100%',
    maxWidth: '380px',
    height: '8px',
    borderRadius: '4px',
    backgroundColor: '#2196F3',
})

export const StartButton = css({
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '12px 24px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',

    _hover: {
      backgroundColor: '#45a049',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }
}) 
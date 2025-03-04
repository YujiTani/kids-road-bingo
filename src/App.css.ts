import { css } from "./styled-system/css";

export const MapContainer = css({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0
});

export const RouteInfoPopup = css({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: 'white',
  padding: '16px',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  zIndex: 1000,
  maxWidth: '300px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
});

export const PopupHeader = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px'
});

export const PopupTitle = css({
  margin: 0,
  fontSize: '16px',
  fontWeight: 600,
  color: '#333'
});

export const CloseButton = css({
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#666',
  padding: '0 4px'
});

export const InfoContainer = css({
  display: 'flex',
  gap: '16px',
  marginBottom: '16px'
});

export const InfoLabel = css({
  fontSize: '12px',
  color: '#666',
  marginBottom: '4px'
});

export const InfoValue = css({
  fontSize: '14px',
  fontWeight: 500,
  color: '#333'
});

export const ButtonContainer = css({
  display: 'flex',
  gap: '8px'
});

export const ConfirmButton = css({
  flex: 1,
  padding: '8px 16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
  transition: 'background-color 0.2s',

  _hover: {
    backgroundColor: '#45a049'
  }
});

export const CancelButton = css({
  flex: 1,
  padding: '8px 16px',
  backgroundColor: '#f5f5f5',
  color: '#666',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
  transition: 'background-color 0.2s',

  _hover: {
    backgroundColor: '#e0e0e0'
  }
}); 
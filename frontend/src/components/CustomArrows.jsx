import React from 'react';

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: '-40px',
        zIndex: 1,
        width: '30px',
        height: '30px',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      ‹
    </div>
  );
};

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: '-40px',
        zIndex: 1,
        width: '30px',
        height: '30px',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      ›
    </div>
  );
};

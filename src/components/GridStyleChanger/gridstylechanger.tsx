import { useState } from 'react';
import { FaGripLines } from 'react-icons/fa';
import { BsGrid3X3GapFill } from 'react-icons/bs';
import styles from './gridstylechanger.module.scss';

function GridStyleChanger({ changeGridStyle }:{changeGridStyle:(gridStyle:'Horizontal'|'Multi', gridColumns:number)=>void}) {
  const [showActiveButton, setShowActiveButton] = useState('grid');
  const { grids, activeButton, button } = styles;
  window.addEventListener('resize', () => {
    if (window.innerWidth < 480) {
      changeGridStyle('Multi', 4);
    }
  });

  const handleGridStyleChange = (buttonType: string) => {
    if (buttonType === 'horizontal') {
      setShowActiveButton('horizontal');
      changeGridStyle('Horizontal', 1);
    } else {
      setShowActiveButton('grid');
      changeGridStyle('Multi', 4);
    }
  };
  return (
    <div className={grids}>
      <button
        type="button"
        onClick={() => handleGridStyleChange('grid')}
        className={showActiveButton === 'grid' ? activeButton : button}
      >
        <BsGrid3X3GapFill data-testid="verticalGrid" style={{ fontSize: '30px', cursor: 'pointer' }} />
      </button>
      <button
        id="horizontal"
        type="button"
        className={showActiveButton === 'horizontal' ? activeButton : button}
        onClick={() => handleGridStyleChange('horizontal')}
      >
        <FaGripLines style={{ fontSize: '30px', cursor: 'pointer' }} data-testid="horizontalGrid" />
      </button>
    </div>
  );
}
export default GridStyleChanger;
